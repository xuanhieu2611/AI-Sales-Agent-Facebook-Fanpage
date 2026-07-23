/**
 * Funnel orchestration — the glue between an incoming message, the LLM brain,
 * the state store, the scheduler, and the Drive-access automation.
 *
 * `handleCustomerMessage` is the single entry point used by both the server
 * (real Messenger) and the playground. It does NOT send anything itself; it
 * returns the text to send so the caller owns the transport.
 */
import { generateReply, type FunnelEvent } from "./brain.js";
import { getStore, type JobType, type Stage } from "./state.js";
import { grantGiftAccess } from "./automation.js";
import { addPlayNotice } from "./playNotices.js";

// Timer durations (hours). TIMER_SCALE lets you speed everything up for testing
// (e.g. TIMER_SCALE=0.001 turns 20h into ~72s). Default 1 = real time.
const SCALE = Number(process.env.TIMER_SCALE) || 1;
export const HOURS = {
  GIFT_EXPIRY_20H: 20,
  GIFT_NOREPLY_6H: 6,
  GIFT_COLD_24H: 24,
  SELL_REACT_6H: 6,
  TRIAL_EXPIRY_20H: 20,
  POSTTRIAL_NOREPLY_6H: 6,
} satisfies Partial<Record<JobType, number>>;

// Jobs that only make sense while the customer is silent — cancelled the moment
// they send anything.
const NO_REPLY_JOBS: JobType[] = [
  "GIFT_NOREPLY_6H",
  "GIFT_COLD_24H",
  "SELL_REACT_6H",
  "POSTTRIAL_NOREPLY_6H",
];

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

export function inHours(h: number): Date {
  return new Date(Date.now() + h * 3600_000 * SCALE);
}

export interface HandledMessage {
  text: string;
  handoff: boolean;
  /** System notices (email grant, events, handoff) — for playground / logs. */
  notices: string[];
}

async function turnCount(psid: string): Promise<number> {
  const store = await getStore();
  return (await store.getTurns(psid)).length;
}

async function notice(psid: string, text: string, bucket: string[]): Promise<void> {
  bucket.push(text);
  addPlayNotice(psid, text, await turnCount(psid));
}

/**
 * Process one inbound customer message end-to-end and return the reply to send.
 * `kind` distinguishes a normal text from a reaction ("thả tim").
 */
export async function handleCustomerMessage(
  psid: string,
  text: string,
  kind: "text" | "reaction" = "text",
): Promise<HandledMessage> {
  const store = await getStore();
  const convo = await store.getConversation(psid);
  const notices: string[] = [];

  // The customer just engaged: record it, wake them from "cold", and cancel any
  // pending silent-follow-up nags.
  const patch: Record<string, unknown> = { lastCustomerMsgAt: new Date() };
  if (convo.cold) patch.cold = false;
  await store.updateConversation(psid, patch);
  await store.cancelJobs(psid, NO_REPLY_JOBS);

  await store.appendMessage(psid, "user", text);

  // Email capture → kick off the (automated) 24h gift access + expiry reminder.
  const emailMatch = kind === "text" ? text.match(EMAIL_RE) : null;
  if (emailMatch && !convo.accessGrantedAt) {
    const email = emailMatch[0];
    await store.updateConversation(psid, {
      email,
      accessGrantedAt: new Date(),
      stage: "gift",
    });
    const grantMsg = await grantGiftAccess(email, psid);
    await notice(psid, grantMsg, notices);
    await notice(
      psid,
      `⏰ Đã hẹn GIFT_EXPIRY_20H (sau ${HOURS.GIFT_EXPIRY_20H}h × TIMER_SCALE)`,
      notices,
    );
    await store.cancelJobs(psid, ["GIFT_EXPIRY_20H"]);
    await store.scheduleJob(psid, "GIFT_EXPIRY_20H", inHours(HOURS.GIFT_EXPIRY_20H));
  }

  // Ask the model for a reply.
  const reply = await generateReply(psid);

  // Persist the assistant turn WITH markers so context stays consistent.
  await store.appendMessage(psid, "assistant", reply.raw);
  await store.updateConversation(psid, { lastBotMsgAt: new Date() });

  await applyEvents(psid, reply.events, notices);

  if (reply.handoff) {
    await store.updateConversation(psid, { handedOff: true, stage: "handed_off" });
    await store.cancelJobs(psid, [
      ...NO_REPLY_JOBS,
      "GIFT_EXPIRY_20H",
      "TRIAL_EXPIRY_20H",
      "PROMO_DEADLINE_MINUS_1D",
    ]);
    await notice(psid, "🔔 [Đã đánh dấu cần người thật] — bot im, chờ bạn xử lý", notices);
  }

  return { text: reply.text, handoff: reply.handoff, notices };
}

async function applyEvents(psid: string, events: FunnelEvent[], notices: string[]): Promise<void> {
  if (events.length === 0) return;
  const store = await getStore();
  const convo = await store.getConversation(psid);

  for (const ev of events) {
    if (ev === "gift_watched") {
      // Customer has watched / given gift feedback — the "còn 4h hãy xem" nudge is obsolete.
      // Keep silence nags (GIFT_NOREPLY / SELL_REACT) intact.
      await store.cancelJobs(psid, ["GIFT_EXPIRY_20H"]);
      await notice(psid, `[EVENT:gift_watched] → hủy GIFT_EXPIRY_20H`, notices);
    } else if (ev === "course_sent") {
      await setStage(psid, "selling");
      await store.cancelJobs(psid, ["GIFT_EXPIRY_20H", "SELL_REACT_6H"]);
      await store.scheduleJob(psid, "SELL_REACT_6H", inHours(HOURS.SELL_REACT_6H));
      await notice(psid, `[EVENT:course_sent] → stage selling, hủy GIFT_EXPIRY_20H, hẹn SELL_REACT_6H`, notices);
    } else if (ev === "trial_sent") {
      await store.updateConversation(psid, { trialSentAt: new Date(), stage: "trial" });
      await store.cancelJobs(psid, ["GIFT_EXPIRY_20H", "TRIAL_EXPIRY_20H"]);
      await store.scheduleJob(psid, "TRIAL_EXPIRY_20H", inHours(HOURS.TRIAL_EXPIRY_20H));
      await notice(psid, `[EVENT:trial_sent] → stage trial, hủy GIFT_EXPIRY_20H, hẹn TRIAL_EXPIRY_20H`, notices);
    } else if (ev === "price_quoted") {
      if (!convo.promoDeadline) {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 2);
        const deadlineStr = deadline.toISOString().slice(0, 10);
        await store.updateConversation(psid, { promoDeadline: deadlineStr });
        const remindAt = new Date(deadline);
        remindAt.setDate(remindAt.getDate() - 1);
        remindAt.setHours(9, 0, 0, 0);
        if (remindAt.getTime() > Date.now()) {
          await store.scheduleJob(psid, "PROMO_DEADLINE_MINUS_1D", remindAt);
          await notice(
            psid,
            `[EVENT:price_quoted] promo đến ${deadlineStr}, hẹn nhắc trước 1 ngày`,
            notices,
          );
        } else {
          await notice(psid, `[EVENT:price_quoted] promo đến ${deadlineStr}`, notices);
        }
      } else {
        await notice(psid, `[EVENT:price_quoted] (đã có promo ${convo.promoDeadline})`, notices);
      }
    } else if (ev === "extend") {
      await handleExtend(psid, notices);
    }
  }
}

async function handleExtend(psid: string, notices: string[]): Promise<void> {
  const store = await getStore();
  const convo = await store.getConversation(psid);
  const afterTrial = convo.stage === "trial" || convo.stage === "post_trial";

  if (afterTrial) {
    if (convo.trialExtended) {
      await notice(psid, `[EVENT:extend] bỏ qua — trial đã gia hạn 1 lần`, notices);
      return;
    }
    await store.updateConversation(psid, { trialExtended: true });
    if (convo.email) {
      const msg = await grantGiftAccess(convo.email, psid, { extension: true });
      await notice(psid, msg, notices);
    }
    await store.cancelJobs(psid, ["TRIAL_EXPIRY_20H"]);
    await store.scheduleJob(psid, "TRIAL_EXPIRY_20H", inHours(HOURS.TRIAL_EXPIRY_20H));
    await notice(psid, `[EVENT:extend] gia hạn trial + hẹn TRIAL_EXPIRY_20H lại`, notices);
  } else {
    if (convo.giftExtended) {
      await notice(psid, `[EVENT:extend] bỏ qua — gift đã gia hạn 1 lần`, notices);
      return;
    }
    await store.updateConversation(psid, { giftExtended: true });
    if (convo.email) {
      const msg = await grantGiftAccess(convo.email, psid, { extension: true });
      await notice(psid, msg, notices);
    }
    await store.cancelJobs(psid, ["GIFT_EXPIRY_20H"]);
    await store.scheduleJob(psid, "GIFT_EXPIRY_20H", inHours(HOURS.GIFT_EXPIRY_20H));
    await notice(psid, `[EVENT:extend] gia hạn gift + hẹn GIFT_EXPIRY_20H lại`, notices);
  }
}

async function setStage(psid: string, stage: Stage): Promise<void> {
  const store = await getStore();
  await store.updateConversation(psid, { stage });
}
