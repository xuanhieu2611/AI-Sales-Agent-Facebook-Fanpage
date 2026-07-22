import type { PoolConfig } from "pg";

/**
 * Build a pg Pool config from DATABASE_URL.
 *
 * pg ≥8.22 treats `sslmode=require` in the URL as verify-full and *replaces*
 * any explicit `ssl` object — which breaks Supabase (self-signed chain) even
 * when we pass `{ rejectUnauthorized: false }`. Strip sslmode and set SSL
 * ourselves for supabase hosts.
 */
export function poolConfigFromUrl(url: string, extras: PoolConfig = {}): PoolConfig {
  const isSupabase = url.includes("supabase.");
  const connectionString = stripQueryParam(url, "sslmode");
  return {
    connectionString,
    ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
    ...extras,
  };
}

function stripQueryParam(url: string, key: string): string {
  const i = url.indexOf("?");
  if (i === -1) return url;
  const base = url.slice(0, i);
  const kept = url
    .slice(i + 1)
    .split("&")
    .filter((p) => p && !p.toLowerCase().startsWith(`${key.toLowerCase()}=`));
  return kept.length ? `${base}?${kept.join("&")}` : base;
}
