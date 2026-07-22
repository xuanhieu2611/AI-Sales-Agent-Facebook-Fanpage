/**
 * In-memory system notices for the web playground (/play).
 * Real Messenger PSIDs are ignored — testers only see these on web-* sessions.
 */
export type PlayNotice = { text: string; afterTurns: number };

const bySession = new Map<string, PlayNotice[]>();

export function isPlaySession(psid: string): boolean {
  return psid.startsWith("web-");
}

export function addPlayNotice(psid: string, text: string, afterTurns: number): void {
  if (!isPlaySession(psid)) return;
  const list = bySession.get(psid) ?? [];
  list.push({ text, afterTurns });
  bySession.set(psid, list);
}

export function getPlayNotices(psid: string): PlayNotice[] {
  return bySession.get(psid) ?? [];
}

export function clearPlayNotices(psid: string): void {
  bySession.delete(psid);
}
