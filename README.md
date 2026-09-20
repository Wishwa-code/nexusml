# NexusML // Command

An internal ops portal for a small team, built with Next.js (App Router) for
both frontend and backend. Users authenticate, then land on a command
dashboard with three modules: a **team roster**, an **announcements feed**
(post an update, see it appear instantly), and a **case-file archive** — a
shared, Google-Docs-style document store where files can be created, opened,
edited, and saved.

The original brief asked for one section done end-to-end; this version grew
into three because a later request asked for a team list, announcements, and
a docs section with create/update/view, styled as a "secret agentic team"
command center. Announcements is still the most fully-featured loop (the
original scope); Team and Docs were added on top of the same patterns.

## Stack

- **Next.js 16** (App Router, Route Handlers, Server Components) — TypeScript
- **Prisma + SQLite** for storage (a single file, zero setup for whoever runs this)
- **jose** for signing/verifying session JWTs, **bcryptjs** for password hashing
- **Tailwind CSS**, dark "tactical terminal" design system (see below)

## Getting started

```bash
npm install
cp .env.example .env          # DATABASE_URL + SESSION_SECRET
npx prisma migrate dev        # creates prisma/dev.db and applies the schema
npm run db:seed               # seeds users, team roster, announcements, case files
npm run dev
```

Then open `http://localhost:3000` — you'll be redirected to `/login`.

**Demo account:** `admin@nexusml.dev` / `password123`
(a second seeded user, `grace@nexusml.dev` / `password123`, exists to show
attribution with more than one author)

`npm run build && npm start` works the same way for a production check.

## What's implemented

- Login / logout backed by real password hashes (bcrypt) in a SQLite `User` table.
- A signed, `httpOnly` session cookie (JWT via `jose`) — no session table, no
  external auth service.
- Every page under the dashboard and every API route re-verifies the session
  server-side; `src/proxy.ts` additionally redirects unauthenticated requests
  before they render.
- **Dashboard** (`/dashboard`): entry hub with a card per module and a live
  count pulled from the database.
- **Team** (`/team`): read-only roster (callsign, name, role, status) — no
  create/edit UI, since the brief only asked for a "team list."
- **Announcements** (`/announcements`): post a title + body, see it appear at
  the top of the list without a full page reload.
- **Docs** (`/docs`, `/docs/[id]`): a Google-Docs-like flow — a grid of
  existing files, a "+ NEW FILE" button that creates a blank document and
  opens its editor, and an editor that saves title/content edits via
  `PATCH` with a dirty/saved indicator.

## Design system

Loaded a "tactical telemetry" design language for the crime-ops premise:
near-black background (`#0a0a0a`), phosphor-white text, a single red accent
for actionable/active UI, terminal green reserved for exactly one purpose
(the `StatusDot` "ACTIVE" indicator — deliberately not used anywhere else, so
it stays meaningful), JetBrains Mono throughout, zero border-radius, and a
CRT scanline overlay (`body::before` in `globals.css`). Bracketed labels
(`[ MODULE ]`, `[ SAVE ]`) and `>>>`/`<<<` markers stand in for icons.
Borders form the grid: adjacent cards share a 1px line by giving the
container the border color as its background and each cell a 1px gap
(see `DashboardCard`/`TeamTable`) — used only where the grid is fully
rectangular; the doc list uses individual bordered cards with a normal gap
instead, because a variable item count left an empty grid cell exposing the
shared background color as a stray gray block.

## Design decisions and reasoning

**Hand-rolled auth instead of an auth library.** I implemented the session
flow directly (bcrypt hash check → sign a JWT with `jose` → set an `httpOnly`,
`sameSite=lax` cookie → verify it on every protected request) rather than
reaching for NextAuth/Auth.js, since the brief evaluates "how you protect
routes and API calls" and a library would hide that mechanism. It follows the
pattern in Next.js's own auth guide: `lib/session.ts` for encrypt/decrypt +
cookie management, `lib/dal.ts` (`verifySession`, memoized per-request with
React's `cache()`) as the single place that answers "who is logged in," and
`src/proxy.ts` (Next 16's renamed `middleware.ts`) for a fast, cookie-only
redirect. The DAL check is repeated inside every API route handler and every
page itself — Proxy is documented as an *optimistic* check and shouldn't be
the only gate.

**Prisma + SQLite over a hosted database.** SQLite means anyone evaluating
this can `npm install && migrate && seed && dev` with no accounts,
containers, or credentials to configure, while Prisma still gives a real
schema, migrations, and type-safe queries.

**Reads via Server Component, writes via API route.** Every list page
(`/dashboard`, `/team`, `/announcements`, `/docs`) is a Server Component that
reads straight through a shared data-access module (`lib/team.ts`,
`lib/announcements.ts`, `lib/documents.ts`) — no self-HTTP round trip for
data the server already has. Mutations (posting an announcement, creating or
saving a document) go through protected API routes called from client
components with `fetch`, which is the path a second client would also use.
Both paths share the same data-access functions, so query shape only lives
in one place.

**State management.** Each interactive section (`AnnouncementsBoard`,
`DocumentEditor`, `NewDocumentButton`) is a small client component holding
just its own slice of state via `useState`, seeded from server-rendered
initial data, updated locally from the API response on success — no full
refetch, no page reload, no external state or data-fetching library. The app
has a handful of independent lists/forms, not shared cross-page state, so
plain `useState`/`fetch` covers it without the overhead of a caching layer.

**Component split.** Presentational, single-purpose components
(`AnnouncementCard`, `TeamTable`, `DocumentList`, `StatusDot`, `TopBar`, ...)
are reusable and easy to reason about in isolation; only the small set of
"board"/"editor" components own state and wire the others together.

## Explicitly out of scope

No self-service sign-up (accounts are seeded — this is an internal tool with
provisioned users), no roles/permissions, no deleting announcements or
documents, no team-roster editing UI, no pagination (small datasets,
`findMany` is plenty), no rich-text formatting in the doc editor (plain
textarea — matches "similar to Google Docs" for the create/update/view loop
without building a rich-text engine).

## Project structure

```
prisma/
  schema.prisma            User, Announcement, TeamMember, Document
  seed.ts                   demo users, team roster, announcements, case files
src/
  proxy.ts                  optimistic auth redirect (Next 16's middleware)
  lib/
    db.ts                    Prisma client singleton
    session.ts                JWT sign/verify + cookie helpers
    dal.ts                    verifySession() — single source of truth for "who's logged in"
    auth.ts                   credential verification (bcrypt)
    team.ts                   team data-access layer
    announcements.ts          announcements data-access layer
    documents.ts               documents data-access layer
    types.ts                   client-safe types
  app/
    login/page.tsx
    dashboard/page.tsx         protected, Server Component — module hub
    team/page.tsx               protected, Server Component
    announcements/page.tsx      protected, Server Component
    docs/page.tsx                protected, Server Component — file list
    docs/[id]/page.tsx            protected, Server Component — editor
    api/auth/login/route.ts, api/auth/logout/route.ts
    api/team/route.ts
    api/announcements/route.ts
    api/documents/route.ts, api/documents/[id]/route.ts
  components/
    TopBar.tsx, LoginForm.tsx, LogoutButton.tsx
    DashboardCard.tsx, StatusDot.tsx, TeamTable.tsx
    AnnouncementsBoard.tsx, AnnouncementForm.tsx, AnnouncementList.tsx, AnnouncementCard.tsx
    DocumentList.tsx, NewDocumentButton.tsx, DocumentEditor.tsx
```
