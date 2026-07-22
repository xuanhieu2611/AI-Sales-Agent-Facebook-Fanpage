/**
 * Scheduler — polls the scheduled_jobs queue and fires the timed follow-ups.
 *
 * Each job re-checks a guard at fire time (has the customer replied since? handed
 * off? gone cold?) so a job scheduled hours ago still does the right thing. The
 * customer-reply path already cancels the silent-follow-up jobs; the guards are a
 * second line of defence.
 *
 * Runs in-process (one setInterval). If you later deploy serverless, swap this
 * for Supabase pg_cron calling an endpoint — the job table stays the same.
 */
import { FOLLOW_UPS } from "./business.js";
import { getStore, type Conversation, type ScheduledJob, type Store } from "./state.js";
import { HOURS, inHours } from "./funnel.js";
import { addPlayNotice } from "./playNotices.js";

/** How the scheduler delivers a message (injected so it's testable). */
export type Sender = (psid: string, text: string) => Promise<void>;

const POLL_MS = Number(process.env.SCHEDULER_POLL_MS) || 30_000;

let timer: NodeJS.Timeout | null = null;

export function startScheduler(send: Sender): void {
  if (timer) return;
  console.log(`⏰ Scheduler started (poll every ${POLL_MS / 1000}s).`);
  const tick = () => runDueJobs(send).catch((e) => console.error("Scheduler tick failed:", e));
  timer = setInterval(tick, POLL_MS);
  tick(); // run once on boot to catch jobs that came due while we were down
}

export function stopScheduler(): void {
  if (timer) clearInterval(timer);
  timer = null;
}

export async function runDueJobs(send: Sender): Promise<void> {
  const store = await getStore();
  const jobs = await store.dueJobs(new Date());
  for (const job of jobs) {
    try {
      await runJob(store, send, job);
    } catch (e) {
      console.error(`Job ${job.jobType} for ${job.psid} failed:`, e);
      await store.finishJob(job.id, "skipped");
    }
  }
}

/** True if the customer has NOT sent anything since this job was scheduled. */
function stillSilent(c: Conversation, job: ScheduledJob): boolean {
  return !c.lastCustomerMsgAt || c.lastCustomerMsgAt <= job.createdAt;
}

async function deliver(store: Store, send: Sender, psid: string, key: keyof typeof FOLLOW_UPS): Promise<void> {
  const text = FOLLOW_UPS[key];
  await send(psid, text);
  await store.appendMessage(psid, "assistant", text);
  await store.updateConversation(psid, { lastBotMsgAt: new Date() });
  const turns = await store.getTurns(psid);
  addPlayNotice(psid, `⏰ Shop (tự động) · ${key}`, turns.length);
}

async function runJob(store: Store, send: Sender, job: ScheduledJob): Promise<void> {
  const c = await store.getConversation(job.psid);

  // Universal skips.
  if (c.handedOff || c.cold) {
    await store.finishJob(job.id, "skipped");
    return;
  }

  switch (job.jobType) {
    case "GIFT_EXPIRY_20H": {
      // Only relevant while still in the gift phase.
      if (c.stage !== "gift") return void (await store.finishJob(job.id, "skipped"));
      await deliver(store, send, job.psid, "GIFT_EXPIRY_20H");
      await store.scheduleJob(job.psid, "GIFT_NOREPLY_6H", inHours(HOURS.GIFT_NOREPLY_6H));
      break;
    }
    case "GIFT_NOREPLY_6H": {
      if (!stillSilent(c, job)) return void (await store.finishJob(job.id, "skipped"));
      await deliver(store, send, job.psid, "GIFT_NOREPLY_6H");
      await store.scheduleJob(job.psid, "GIFT_COLD_24H", inHours(HOURS.GIFT_COLD_24H));
      break;
    }
    case "GIFT_COLD_24H": {
      // No message — just drop to cold if they never came back.
      if (stillSilent(c, job)) await store.updateConversation(job.psid, { cold: true, stage: "cold" });
      break;
    }
    case "SELL_REACT_6H": {
      if (!stillSilent(c, job)) return void (await store.finishJob(job.id, "skipped"));
      await deliver(store, send, job.psid, "SELL_REACT_6H");
      break;
    }
    case "TRIAL_EXPIRY_20H": {
      await deliver(store, send, job.psid, "TRIAL_EXPIRY_20H");
      await store.updateConversation(job.psid, { stage: "post_trial" });
      await store.scheduleJob(job.psid, "POSTTRIAL_NOREPLY_6H", inHours(HOURS.POSTTRIAL_NOREPLY_6H));
      break;
    }
    case "POSTTRIAL_NOREPLY_6H": {
      if (!stillSilent(c, job)) return void (await store.finishJob(job.id, "skipped"));
      await deliver(store, send, job.psid, "POSTTRIAL_NOREPLY_6H");
      break;
    }
    case "PROMO_DEADLINE_MINUS_1D": {
      if (c.stage === "closing") return void (await store.finishJob(job.id, "skipped"));
      await deliver(store, send, job.psid, "PROMO_DEADLINE_MINUS_1D");
      break;
    }
  }

  await store.finishJob(job.id, "done");
}
