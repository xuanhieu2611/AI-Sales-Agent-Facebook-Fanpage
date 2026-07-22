import "dotenv/config";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { handleCustomerMessage } from "./funnel.js";
import { startScheduler } from "./scheduler.js";

/**
 * Chat with the agent locally, as if you were a customer.
 * Run: npm run playground
 * Type "thoát" to quit.
 *
 * Uses the in-memory store unless DATABASE_URL is set. The scheduler also runs,
 * so timed follow-ups print here too — set TIMER_SCALE small (e.g. 0.002) to
 * watch the 20h/6h nudges fire in seconds.
 */
const USER = "playground-user";
const rl = readline.createInterface({ input, output });

// In the playground, "sending" just prints to the terminal.
startScheduler(async (_psid, text) => console.log(`\nShop (tự động): ${text}\n`));

console.log("💬 Nhắn tin thử với AI (gõ 'thoát' để dừng)\n");

while (true) {
  let msg: string;
  try {
    msg = await rl.question("Khách: ");
  } catch {
    break; // stdin closed (e.g. piped input ended)
  }
  if (msg.trim().toLowerCase() === "thoát") break;

  const reply = await handleCustomerMessage(USER, msg);
  console.log(`Shop:  ${reply.text}`);
  if (reply.handoff) console.log("       🔔 [Đã đánh dấu cần người thật]");
  console.log();
}

rl.close();
process.exit(0);
