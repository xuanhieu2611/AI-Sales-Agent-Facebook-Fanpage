# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

An AI sales & customer-service agent for the **English with Bubby** Facebook Page
(an English-teaching business, Vietnamese-speaking customers). It auto-replies to
Messenger conversations, following the owner's sales script, and hands off to a human
when needed. The LLM (via OpenRouter) is the conversational brain.

**Customer-facing language is Vietnamese.** All prompts, replies, and the script in
`business.ts` are in Vietnamese — keep it that way unless asked otherwise.

## The owner & how to work with them

- The owner is **a developer** who also runs the business — talk to them technically,
  no need to over-explain basics. Exception: for the Facebook/Meta dashboard and other
  external-UI steps, still give exact click-by-click actions (that UI changes and is
  easy to get lost in).
- They work **iteratively across sessions**: they'll open a session and say "add X",
  "fix Y", "help me with Z". Pick up the context from this file and the code — don't
  make them re-explain what the project is or what was decided before.
- **Verify before claiming done.** Run the code / typecheck / actually test the path
  when possible, rather than assuming it works. The owner values honest status:
  if something is untested or failed, say so.
- **Prefer current facts over memory** for anything that drifts (Facebook/Meta setup,
  API details, model IDs). Fetch the latest when it matters — the owner explicitly
  values this over guessing from training data.
- Make hard-to-reverse or outward-facing changes (deploys, deleting data, anything the
  customer would see) only after confirming — this is a live business touching real
  customers.

## Vision & goals

- **Goal:** an AI assistant that replies to Facebook customers following the owner's
  own sales/consult style, so it **frees up the owner's time** while still selling well
  and keeping customers happy.
- It must **sound like the owner**, not a generic bot — warm, natural, short chat-style
  Vietnamese. The `business.ts` script is the source of that voice.
- **Human-in-the-loop matters:** when a customer needs a real person (complaints,
  specifics, anything uncertain), hand off gracefully rather than bluff. Losing/annoying
  a real customer is worse than a slightly slower reply.
- Direction of travel: local testing → live on the Page for the owner → reliable enough
  to run unattended (persistence + handoff alerts) → eventually open to the public
  (App Review). Build toward that without over-engineering ahead of need.

## Lessons learned — don't repeat these

_Append the big ones here as we go, so mistakes don't recur. Keep it to real,
recurring pitfalls — not every minor thing._

- **This is a teaching business (English with Bubby), NOT e-commerce.** Don't reach for
  shipping / COD / "product" / order-tracking framing. Think courses, tuition, class
  schedule, trial classes, enrollment. (The original scaffold used e-commerce fields —
  they don't fit.)
- **Model IDs must be full OpenRouter slugs** (`deepseek/deepseek-v4-flash`,
  `anthropic/claude-haiku-4.5`) — short names 404.
- **Vietnamese needs `line-height` ≥ ~1.2 on headings.** Vietnamese stacks two
  levels of marks (`ế` `ỗ` `ữ`), so ascenders run much taller than English. Below
  ~1.2 the next line's marks collide into the line above and get clipped — it
  looks exactly like a broken font missing its diacritics, and you will waste an
  hour blaming the font. The trap: Tailwind's `text-5xl`/`text-4xl`/… utilities
  ship their own `line-height: 1`, which overrides any base rule in `globals.css`
  — so every heading using `text-*` needs an explicit `leading-*` next to it.
  (Verified on the landing page: 1.12 broke, 1.22 is clean.)

## Architecture

```
Customer → Messenger → webhook (server.ts) → funnel.ts → brain.ts → OpenRouter → reply
                                                 │            └─ emits [EVENT:*]/[HANDOFF]
                                                 ├─ state.ts (Postgres/Supabase or in-memory)
                                                 ├─ automation.ts (grant Drive access on email)
                                                 └─ scheduler.ts (timed follow-ups: 20h/6h/deadline)
```

- **`src/business.ts`** — THE file the owner edits. Shop info, courses/pricing, FAQ,
  sales script, tone rules, handoff rules. Plain Vietnamese text with `[ĐIỀN...]`
  placeholders. Non-technical; treat its content as owner-authored config.
- **`src/prompt.ts`** — builds the system prompt from `business.ts`. Don't hardcode
  business facts here; read them from `business.ts`.
- **`src/brain.ts`** — calls OpenRouter (OpenAI-compatible chat completions) with the
  system prompt + this customer's history + a small volatile date block (today / promo
  deadline). Parses `[HANDOFF]` and
  `[EVENT:course_sent|trial_sent|price_quoted|extend|gift_watched]`,
  strips them, returns `{text, handoff, events}`. Does NOT persist — the funnel does.
- **`src/funnel.ts`** — orchestrator + the actual state machine. `handleCustomerMessage`
  is the single entry point (server + playground). Captures email (regex) → triggers
  automation + schedules the gift-expiry timer; applies the AI's events → stage changes,
  scheduling/cancelling jobs; a customer reply cancels the pending no-reply nags.
- **`src/state.ts`** — `Store` interface with two backends: `PostgresStore` (Supabase,
  when `DATABASE_URL` is set) and `MemoryStore` (playground / no DB). Tables:
  `conversations`, `messages` (last 20 turns), `scheduled_jobs`. `getStore()` picks one.
- **`src/scheduler.ts`** — in-process poller (every `SCHEDULER_POLL_MS`, default 30s).
  Pulls due `scheduled_jobs`, re-checks guards (still silent? handed off? cold?), sends
  the templated follow-up from `business.ts` `FOLLOW_UPS`, and chains the next job.
- **`src/automation.ts`** — POSTs the captured email to `GIFT_ACCESS_WEBHOOK_URL` (the
  owner's Apps Script) to grant/extend the 24h Drive access. Logs only if URL unset.
- **`src/facebook.ts`** — Messenger Send API (send text, typing indicator).
- **`src/server.ts`** — Express webhook. GET verifies the token; POST handles text
  messages AND `message_reactions` ("thả tim"). **Acks with `200` immediately** (Meta
  requires < 5s). If a conversation is `handedOff`, the bot stays silent. On boot it
  connects the DB and starts the scheduler.
- **`src/playground.ts`** — local terminal chat to test the brain without Facebook.

### `web/` — the ads landing page (separate project)

Next.js 16 + Tailwind v4, deployed separately (Vercel). Ad traffic lands here, then
converts to Messenger (`m.me`) or a phone-number form. See `web/README.md`.

- Deliberately **not** gift-first: the old funnel paid for clicks with a free Drive
  video behind an email gate, which selected for freebie hunters. The page delivers
  that proof openly (method breakdown, video previews, feedback wall) and asks for a
  consult instead. The trial lesson is a secondary CTA, below pricing.
- All copy/prices live in `web/lib/site.ts` (+ `web/lib/translations.ts` for the
  hero demo). Components read from those — don't hardcode business facts in JSX.
- Lead form → `web/app/api/lead/route.ts` → Apps Script → Google Sheet
  (`apps-script/leads/`). Separate from the gift-access Apps Script.
- **Note:** landing-page visitors arrive mid-funnel, not at "nhắn Ngữ Pháp xin quà".
  `business.ts` GIAI ĐOẠN 0 still assumes the gift opener — worth revisiting when
  this page goes live.

## Commands

```bash
npm run playground   # chat with the agent locally (no Facebook needed)
npm run dev          # run the webhook server (tsx watch) on PORT (default 3000)
npx tsc --noEmit     # typecheck
```

For Facebook testing: `npm run dev` + `npx ngrok http 3000`, point the Meta app's
webhook at `https://<ngrok>/webhook`. See README.md "Phần 2" for the full flow.

## Conventions & gotchas

- **Model** is `process.env.MODEL` (default `deepseek/deepseek-v4-flash`). Must be a
  full OpenRouter slug. To fall back to Haiku: `anthropic/claude-haiku-4.5`.
- Human handoff is signalled by the model appending the literal marker `[HANDOFF]`.
  If you change that marker, update it in BOTH `business.ts` (the instruction) and
  `brain.ts` (`HANDOFF_MARK`).
- Secrets live in `.env` (gitignored): `OPENROUTER_API_KEY`, `PAGE_ACCESS_TOKEN`,
  `VERIFY_TOKEN`, `MODEL`, `PORT`. Never commit them or print token values.
- Replies should read like real short chat messages (2–4 sentences) — the prompt
  enforces this; don't loosen it without reason.
- **Anti-echo:** the model tends to re-append its standing pitch (promo deadline +
  cọc 300k, "xem xong nhắn feedback nha") in consecutive messages. `QUY_TAC` forbids
  it; `dropEchoes` in `brain.ts` is the deterministic backstop — it drops sentences
  ≥6 tokens that are ≥0.6 Jaccard-similar to the previous assistant message, skipping
  the whole check when the customer's last message looks like a question. History
  stores the deduped text (+ markers), so a dropped echo can't return as context.

## Timers, markers & the state machine (added in the funnel build)

- The script's time-based nodes ("sau 20h", "sau 6h", "1 ngày trước hết hạn") are NOT
  prompt work — they're `scheduled_jobs` rows fired by `scheduler.ts`. The AI never
  schedules itself; it only emits `[EVENT:*]` markers and the funnel schedules from them.
- Job types map to the script: `GIFT_EXPIRY_20H` → `GIFT_NOREPLY_6H` → `GIFT_COLD_24H`
  (gift chain), `SELL_REACT_6H`, `TRIAL_EXPIRY_20H` → `POSTTRIAL_NOREPLY_6H`,
  `PROMO_DEADLINE_MINUS_1D`. Durations + `TIMER_SCALE` live in `funnel.ts`.
- Marker set: `[EVENT:course_sent|trial_sent|price_quoted|extend|gift_watched]` +
  `[HANDOFF]`. If you change them, update BOTH the instruction side (`prompt.ts` /
  `business.ts`) and the parse side (`brain.ts` `EVENT_RE` / `funnel.ts`).
- `GIFT_EXPIRY_20H` is a "haven't watched yet" deadline nudge — cancel it on
  `[EVENT:gift_watched]` or when leaving gift (`course_sent` / `trial_sent` / handoff).
  Do NOT cancel it on a mere "cảm ơn". Silence nags (`GIFT_NOREPLY_6H`, `SELL_REACT_6H`)
  stay on the existing reply/stage logic.
- Promo deadline = first price-quote date + 2 days, stored per-customer in
  `conversations.promo_deadline`; the volatile date block in `brain.ts` feeds it back so
  the model writes the right date. `gia hạn` is enforced once via `gift_extended`/`trial_extended`.
- `cold` only stops proactive follow-ups; a cold customer who messages again is re-engaged.
  Only `handed_off` silences the bot.

## Known TODOs (before / for going live)

- **Handoff notifications:** currently only logs `🔔 CẦN NGƯỜI THẬT` — wire up a real
  alert (Telegram/email). See the `TODO` in `server.ts`.
- **Fill the `[ĐIỀN...]` gaps** in `business.ts`: real `stk`, `soSanhDich` link,
  `hocThuPhatAm` link. And set `GIFT_ACCESS_WEBHOOK_URL` to the Apps Script.
- **Long-lived Page token:** the dashboard token is short-lived; add a token-exchange
  step for production.
- **Deploy target:** ngrok is for testing only; deploy to Render/Railway/a VPS to stay
  online. Keep the same webhook URL or update it in the Meta app.
- **App Review:** required for `pages_messaging` before the bot can reply to the
  general public (non Admin/Developer/Tester accounts).
