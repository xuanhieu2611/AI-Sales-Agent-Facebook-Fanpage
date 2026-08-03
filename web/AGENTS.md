# Landing page — English with Bubby

Ads landing page for Meta traffic. Separate Next.js project from the Messenger
bot at the repo root — deploy independently (Vercel). See `README.md` for the
edit map and pre-launch checklist; see `../AGENTS.md` for the bot / sales-funnel
context.

## Funnel intent

**Not gift-first.** The old Meta ads path paid for clicks with a free Drive video
behind an email gate, which selected for freebie hunters. This page sells the
problem and the method openly (method breakdown, video previews, feedback wall)
and converts to a Messenger consult (`m.me`) or a phone-number lead form. The
trial lesson is a secondary CTA, below pricing.

Do not rebuild an email/Drive freebie gate here. Ad copy that still promises
"tặng bài học free" will pull the wrong audience onto this page.

Customer-facing copy is Vietnamese. Keep it that way unless asked otherwise.

## Source of truth

- Copy, prices, FAQ, links, promo labels → `lib/site.ts`
- Hero "dịch thử" examples → `lib/translations.ts`
- Components read from those — don't hardcode business facts in JSX
- Lead form → `app/api/lead/route.ts` → Apps Script → Google Sheet
  (`../apps-script/leads/`). Separate from the bot's gift-access Apps Script.

## Gotchas

- **Vietnamese headings need** `leading-*` **next to every** `text-*`. Tailwind's
  heading utilities ship `line-height: 1`, which clips stacked diacritics
  (`ế` `ỗ` `ữ`). Use ~1.2+ (verified: 1.12 broke, 1.22 is clean).
- Prefer CSS scroll-driven reveal (`components/Reveal.tsx`) over JS hide-then-show
  — ad traffic on 4G; blank-until-JS hurts bounce.
- `YouTubeLite` loads thumbnails only; don't swap for eager YouTube iframes.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
