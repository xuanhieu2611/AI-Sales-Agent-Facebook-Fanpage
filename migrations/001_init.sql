-- English with Bubby — messaging agent schema.
-- Run once against your Supabase Postgres:  npm run db:migrate
-- (or paste this into the Supabase SQL Editor and Run).

create table if not exists conversations (
  psid                  text primary key,
  stage                 text        not null default 'new',
  email                 text,
  interested_course     text,
  access_granted_at     timestamptz,
  gift_extended         boolean     not null default false,
  trial_sent_at         timestamptz,
  trial_extended        boolean     not null default false,
  promo_deadline        date,
  handed_off            boolean     not null default false,
  cold                  boolean     not null default false,
  last_customer_msg_at  timestamptz,
  last_bot_msg_at       timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table if not exists messages (
  id          bigserial   primary key,
  psid        text        not null references conversations(psid) on delete cascade,
  role        text        not null check (role in ('user', 'assistant')),
  content     text        not null,
  created_at  timestamptz not null default now()
);
create index if not exists messages_psid_time_idx on messages (psid, created_at);

create table if not exists scheduled_jobs (
  id          bigserial   primary key,
  psid        text        not null references conversations(psid) on delete cascade,
  job_type    text        not null,
  fire_at     timestamptz not null,
  status      text        not null default 'pending'
              check (status in ('pending', 'done', 'skipped', 'canceled')),
  created_at  timestamptz not null default now()
);
create index if not exists jobs_due_idx on scheduled_jobs (status, fire_at);
