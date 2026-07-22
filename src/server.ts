import "dotenv/config";
import express from "express";
import { handleCustomerMessage } from "./funnel.js";
import { sendMessage, sendTyping } from "./facebook.js";
import { startScheduler } from "./scheduler.js";
import { getStore } from "./state.js";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "";
const PORT = Number(process.env.PORT) || 3000;

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

app.get("/", (_req, res) => res.send("Page message agent is running."));

app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Webhook URL path: /webhook`);
  await getStore(); // connect the DB up front so errors surface at boot
  startScheduler(sendMessage); // fire the timed follow-ups
});
