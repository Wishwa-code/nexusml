// Client-safe shape of an announcement as it crosses the JSON wire (Date
// becomes an ISO string). Kept separate from the Prisma-backed type in
// announcements.ts, which is server-only.
export type Announcement = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  author: { name: string };
};

export type DocumentSummary = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
};

export type DocumentFull = DocumentSummary & { content: string };

export type TeamMember = {
  id: string;
  callsign: string;
  name: string;
  role: string;
  // Free-form string, not a DB enum (SQLite/Prisma doesn't support enums on
  // this connector) — "ACTIVE" | "STANDBY" | "OFFLINE" by convention.
  // StatusDot renders unrecognized values with a neutral fallback rather
  // than assuming this set is exhaustive.
  status: string;
};
