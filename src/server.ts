import "dotenv/config";
import express from "express";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { handleCustomerMessage } from "./funnel.js";
import { sendMessage, sendTyping } from "./facebook.js";
import { startScheduler } from "./scheduler.js";
import { getStore } from "./state.js";
import { getPlayNotices } from "./playNotices.js";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "";
const PLAYGROUND_SECRET = process.env.PLAYGROUND_SECRET || "";
const PORT = Number(process.env.PORT) || 3000;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PLAY_HTML = readFileSync(join(ROOT, "public", "play.html"), "utf8");

function playgroundAuthorized(req: express.Request): boolean {
  if (!PLAYGROUND_SECRET) return true;
  const header = req.header("x-playground-secret") || "";
  const query = typeof req.query.key === "string" ? req.query.key : "";
  return header === PLAYGROUND_SECRET || query === PLAYGROUND_SECRET;
}

function isWebSessionId(id: unknown): id is string {
  return typeof id === "string" && /^web-[A-Za-z0-9_-]+$/.test(id) && id.length <= 80;
}

// ── Webhook verification (Facebook calls this once when you set up) ──
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ── Incoming events ─────────────────────────────────────────────────
app.post("/webhook", async (req, res) => {
  // Acknowledge immediately so Facebook doesn't retry.
  res.sendStatus(200);

  const body = req.body;
  if (body.object !== "page") return;

  for (const entry of body.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const senderId: string | undefined = event.sender?.id;
      if (!senderId) continue;

      // A text message, or a "thả tim" reaction on one of our messages.
      let text: string | undefined;
      let kind: "text" | "reaction" = "text";
      if (typeof event.message?.text === "string") {
        text = event.message.text;
      } else if (event.reaction?.action === "react") {
        text = `${event.reaction.emoji ?? "❤️"} (khách thả cảm xúc vào tin nhắn)`;
        kind = "reaction";
      } else {
        continue; // delivery/read receipts, stickers, unreacts, etc.
      }
      if (!text) continue;

      await handleIncoming(senderId, text, kind);
    }
  }
});

async function handleIncoming(senderId: string, text: string, kind: "text" | "reaction") {
  try {
    const store = await getStore();
    const convo = await store.getConversation(senderId);
    if (convo.handedOff) {
      console.log(`(handed off) ${senderId}: ${text}`);
      return; // a human owns this thread now
    }

    if (kind === "text") await sendTyping(senderId);
    const reply = await handleCustomerMessage(senderId, text, kind);
    if (reply.text) await sendMessage(senderId, reply.text);
    if (reply.handoff) {
      console.log(`🔔 CẦN NGƯỜI THẬT — khách ${senderId}: "${text}"`);
      // TODO: also notify yourself here (email / Telegram / Slack).
    }
  } catch (err) {
    console.error("Failed to handle event:", err);
  }
}

// ── Web playground (coworker testing without Messenger) ─────────────
app.get("/play", (_req, res) => {
  res.type("html").send(PLAY_HTML);
});

app.get("/api/play/ping", (req, res) => {
  if (!playgroundAuthorized(req)) return res.status(401).json({ error: "Unauthorized" });
  res.json({ ok: true, secretRequired: Boolean(PLAYGROUND_SECRET) });
});

app.get("/api/play/history", async (req, res) => {
  if (!playgroundAuthorized(req)) return res.status(401).json({ error: "Unauthorized" });
  const sessionId = req.query.sessionId;
  if (!isWebSessionId(sessionId)) {
    return res.status(400).json({ error: "Invalid sessionId" });
  }
  try {
    const store = await getStore();
    const convo = await store.getConversation(sessionId);
    const turns = await store.getTurns(sessionId);
    res.json({
      turns,
      handedOff: convo.handedOff,
      stage: convo.stage,
      notices: getPlayNotices(sessionId),
    });
  } catch (err) {
    console.error("play/history failed:", err);
    res.status(500).json({ error: "Failed to load history" });
  }
});

app.post("/api/play/chat", async (req, res) => {
  if (!playgroundAuthorized(req)) return res.status(401).json({ error: "Unauthorized" });
  const sessionId = req.body?.sessionId;
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!isWebSessionId(sessionId)) {
    return res.status(400).json({ error: "Invalid sessionId" });
  }
  if (!text || text.length > 4000) {
    return res.status(400).json({ error: "text required (max 4000 chars)" });
  }

  try {
    const store = await getStore();
    const convo = await store.getConversation(sessionId);
    if (convo.handedOff) {
      const turns = await store.getTurns(sessionId);
      return res.json({
        turns,
        handedOff: true,
        stage: convo.stage,
        text: "",
        notices: getPlayNotices(sessionId),
      });
    }

    const reply = await handleCustomerMessage(sessionId, text);
    // Follow-ups for web-* are skipped by facebook.sendMessage; history poll picks them up.
    if (reply.handoff) {
      console.log(`🔔 CẦN NGƯỜI THẬT — playground ${sessionId}: "${text}"`);
    }
    const turns = await store.getTurns(sessionId);
    const updated = await store.getConversation(sessionId);
    res.json({
      text: reply.text,
      handoff: reply.handoff,
      turns,
      handedOff: updated.handedOff,
      stage: updated.stage,
      notices: getPlayNotices(sessionId),
    });
  } catch (err) {
    console.error("play/chat failed:", err);
    res.status(500).json({ error: "Chat failed" });
  }
});

app.get("/", (_req, res) => res.send("Page message agent is running. Coworker test UI: /play"));

app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Webhook URL path: /webhook`);
  console.log(`Playground UI: /play`);
  await getStore(); // connect the DB up front so errors surface at boot
  startScheduler(sendMessage); // fire the timed follow-ups
});
