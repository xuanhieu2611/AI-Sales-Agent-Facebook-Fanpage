/**
 * State layer — per-customer conversation state, message history, and the
 * scheduled-jobs queue that drives the timed follow-ups.
 *
 * Two backends implement the same `Store` interface:
 *   • PostgresStore — used in production (Supabase). Enabled when DATABASE_URL is set.
 *   • MemoryStore    — used by the playground / when there's no DATABASE_URL.
 *
 * `getStore()` picks one based on the environment, so the rest of the code never
 * cares which is running.
 */
/** One chat turn, OpenAI/OpenRouter message shape. */
export type Turn = { role: "user" | "assistant"; content: string };

/** Where in the funnel a conversation is (see business.ts KỊCH BẢN). */
export type Stage =
  | "new"
  | "gift" // gift sent / access granted, waiting for view + feedback
  | "selling" // course info sent
  | "trial" // trial lesson sent
  | "post_trial" // negotiating after trial
  | "closing" // STK sent
  | "cold" // dropped (no proactive follow-ups)
  | "handed_off"; // a human took over

export interface Conversation {
  psid: string;
  stage: Stage;
  email: string | null;
  interestedCourse: string | null;
  accessGrantedAt: Date | null;
  giftExtended: boolean;
  trialSentAt: Date | null;
  trialExtended: boolean;
  promoDeadline: string | null; // 'YYYY-MM-DD'
  handedOff: boolean;
  cold: boolean;
  lastCustomerMsgAt: Date | null;
  lastBotMsgAt: Date | null;
}

export type JobType =
  | "GIFT_EXPIRY_20H"
  | "GIFT_NOREPLY_6H"
  | "GIFT_COLD_24H"
  | "SELL_REACT_6H"
  | "TRIAL_EXPIRY_20H"
  | "POSTTRIAL_NOREPLY_6H"
  | "PROMO_DEADLINE_MINUS_1D";

export interface ScheduledJob {
  id: number;
  psid: string;
  jobType: JobType;
  fireAt: Date;
  createdAt: Date;
}

const MAX_TURNS = 20;

export interface Store {
  /** Fetch a conversation, creating a blank one if it doesn't exist. */
  getConversation(psid: string): Promise<Conversation>;
  /** Merge a partial update into a conversation. */
  updateConversation(psid: string, patch: Partial<Conversation>): Promise<void>;

  appendMessage(psid: string, role: "user" | "assistant", content: string): Promise<void>;
  /** Last N turns, oldest first, ready to pass to the LLM API. */
  getTurns(psid: string): Promise<Turn[]>;

  scheduleJob(psid: string, jobType: JobType, fireAt: Date): Promise<void>;
  /** Cancel pending jobs of the given types for a customer. */
  cancelJobs(psid: string, jobTypes: JobType[]): Promise<void>;
  /** Pending jobs whose fire time has passed. */
  dueJobs(now: Date): Promise<ScheduledJob[]>;
  finishJob(id: number, status: "done" | "skipped"): Promise<void>;
}

function blankConversation(psid: string): Conversation {
  return {
    psid,
    stage: "new",
    email: null,
    interestedCourse: null,
    accessGrantedAt: null,
    giftExtended: false,
    trialSentAt: null,
    trialExtended: false,
    promoDeadline: null,
    handedOff: false,
    cold: false,
    lastCustomerMsgAt: null,
    lastBotMsgAt: null,
  };
}

// ── In-memory backend ────────────────────────────────────────────────
class MemoryStore implements Store {
  private convos = new Map<string, Conversation>();
  private msgs = new Map<string, Turn[]>();
  private jobs: (ScheduledJob & { status: string })[] = [];
  private nextJobId = 1;

  async getConversation(psid: string): Promise<Conversation> {
    let c = this.convos.get(psid);
    if (!c) {
      c = blankConversation(psid);
      this.convos.set(psid, c);
    }
    return { ...c };
  }

  async updateConversation(psid: string, patch: Partial<Conversation>): Promise<void> {
    const c = await this.getConversation(psid);
    this.convos.set(psid, { ...c, ...patch, psid });
  }

  async appendMessage(psid: string, role: "user" | "assistant", content: string): Promise<void> {
    const list = this.msgs.get(psid) ?? [];
    list.push({ role, content });
    this.msgs.set(psid, list.slice(-MAX_TURNS));
  }

  async getTurns(psid: string): Promise<Turn[]> {
    return [...(this.msgs.get(psid) ?? [])];
  }

  async scheduleJob(psid: string, jobType: JobType, fireAt: Date): Promise<void> {
    this.jobs.push({
      id: this.nextJobId++,
      psid,
      jobType,
      fireAt,
      createdAt: new Date(),
      status: "pending",
    });
  }

  async cancelJobs(psid: string, jobTypes: JobType[]): Promise<void> {
    for (const j of this.jobs) {
      if (j.psid === psid && j.status === "pending" && jobTypes.includes(j.jobType)) {
        j.status = "canceled";
      }
    }
  }

  async dueJobs(now: Date): Promise<ScheduledJob[]> {
    return this.jobs
      .filter((j) => j.status === "pending" && j.fireAt <= now)
      .map((j) => ({ id: j.id, psid: j.psid, jobType: j.jobType, fireAt: j.fireAt, createdAt: j.createdAt }));
  }

  async finishJob(id: number, status: "done" | "skipped"): Promise<void> {
    const j = this.jobs.find((x) => x.id === id);
    if (j) j.status = status;
  }
}

// ── Postgres backend (Supabase) ──────────────────────────────────────
// Loaded lazily so the playground doesn't need `pg` installed/connected.
class PostgresStore implements Store {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private pool: any) {}

  async getConversation(psid: string): Promise<Conversation> {
    const { rows } = await this.pool.query(
      "SELECT * FROM conversations WHERE psid = $1",
      [psid],
    );
    if (rows.length === 0) {
      await this.pool.query(
        "INSERT INTO conversations (psid) VALUES ($1) ON CONFLICT (psid) DO NOTHING",
        [psid],
      );
      return blankConversation(psid);
    }
    return rowToConversation(rows[0]);
  }

  async updateConversation(psid: string, patch: Partial<Conversation>): Promise<void> {
    const cols: Record<string, string> = {
      stage: "stage",
      email: "email",
      interestedCourse: "interested_course",
      accessGrantedAt: "access_granted_at",
      giftExtended: "gift_extended",
      trialSentAt: "trial_sent_at",
      trialExtended: "trial_extended",
      promoDeadline: "promo_deadline",
      handedOff: "handed_off",
      cold: "cold",
      lastCustomerMsgAt: "last_customer_msg_at",
      lastBotMsgAt: "last_bot_msg_at",
    };
    const sets: string[] = [];
    const vals: unknown[] = [psid];
    for (const [key, col] of Object.entries(cols)) {
      if (key in patch) {
        vals.push((patch as Record<string, unknown>)[key]);
        sets.push(`${col} = $${vals.length}`);
      }
    }
    if (sets.length === 0) return;
    await this.pool.query(
      `INSERT INTO conversations (psid) VALUES ($1) ON CONFLICT (psid) DO NOTHING`,
      [psid],
    );
    await this.pool.query(
      `UPDATE conversations SET ${sets.join(", ")}, updated_at = now() WHERE psid = $1`,
      vals,
    );
  }

  async appendMessage(psid: string, role: "user" | "assistant", content: string): Promise<void> {
    await this.pool.query(
      "INSERT INTO messages (psid, role, content) VALUES ($1, $2, $3)",
      [psid, role, content],
    );
  }

  async getTurns(psid: string): Promise<Turn[]> {
    const { rows } = await this.pool.query(
      "SELECT role, content FROM messages WHERE psid = $1 ORDER BY created_at DESC, id DESC LIMIT $2",
      [psid, MAX_TURNS],
    );
    return rows
      .reverse()
      .map((r: { role: "user" | "assistant"; content: string }) => ({ role: r.role, content: r.content }));
  }

  async scheduleJob(psid: string, jobType: JobType, fireAt: Date): Promise<void> {
    await this.pool.query(
      "INSERT INTO scheduled_jobs (psid, job_type, fire_at) VALUES ($1, $2, $3)",
      [psid, jobType, fireAt],
    );
  }

  async cancelJobs(psid: string, jobTypes: JobType[]): Promise<void> {
    await this.pool.query(
      "UPDATE scheduled_jobs SET status = 'canceled' WHERE psid = $1 AND status = 'pending' AND job_type = ANY($2)",
      [psid, jobTypes],
    );
  }

  async dueJobs(now: Date): Promise<ScheduledJob[]> {
    const { rows } = await this.pool.query(
      "SELECT id, psid, job_type, fire_at, created_at FROM scheduled_jobs WHERE status = 'pending' AND fire_at <= $1 ORDER BY fire_at LIMIT 50",
      [now],
    );
    return rows.map(
      (r: { id: number; psid: string; job_type: JobType; fire_at: Date; created_at: Date }) => ({
        id: Number(r.id),
        psid: r.psid,
        jobType: r.job_type,
        fireAt: new Date(r.fire_at),
        createdAt: new Date(r.created_at),
      }),
    );
  }

  async finishJob(id: number, status: "done" | "skipped"): Promise<void> {
    await this.pool.query("UPDATE scheduled_jobs SET status = $2 WHERE id = $1", [id, status]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToConversation(r: any): Conversation {
  return {
    psid: r.psid,
    stage: r.stage,
    email: r.email,
    interestedCourse: r.interested_course,
    accessGrantedAt: r.access_granted_at ? new Date(r.access_granted_at) : null,
    giftExtended: r.gift_extended,
    trialSentAt: r.trial_sent_at ? new Date(r.trial_sent_at) : null,
    trialExtended: r.trial_extended,
    promoDeadline: r.promo_deadline
      ? new Date(r.promo_deadline).toISOString().slice(0, 10)
      : null,
    handedOff: r.handed_off,
    cold: r.cold,
    lastCustomerMsgAt: r.last_customer_msg_at ? new Date(r.last_customer_msg_at) : null,
    lastBotMsgAt: r.last_bot_msg_at ? new Date(r.last_bot_msg_at) : null,
  };
}

// ── Store singleton ──────────────────────────────────────────────────
let store: Store | null = null;

/** Returns the active store, building it on first use. */
export async function getStore(): Promise<Store> {
  if (store) return store;

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("ℹ️  DATABASE_URL not set — using in-memory store (data resets on restart).");
    store = new MemoryStore();
    return store;
  }

  // Lazy-import pg so the playground path never requires it.
  const { Pool } = await import("pg");
  const { poolConfigFromUrl } = await import("./pg.js");
  const pool = new Pool(poolConfigFromUrl(url, { max: 5 }));
  await pool.query("SELECT 1"); // fail fast if the connection is wrong
  console.log("✅ Connected to Postgres (Supabase).");
  store = new PostgresStore(pool);
  return store;
}
