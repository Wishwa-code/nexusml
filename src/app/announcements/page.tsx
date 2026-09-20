import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { listAnnouncements } from "@/lib/announcements";
import { TopBar } from "@/components/TopBar";
import { AnnouncementsBoard } from "@/components/AnnouncementsBoard";

// Server Component: reads the session and the initial announcement list
// straight from the data-access layer (no self-fetch over HTTP needed for
// the first render). Creating an announcement goes through the protected
// /api/announcements route instead — see AnnouncementsBoard — so that path
// works the same for this UI as it would for any other client.
export default async function AnnouncementsPage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const initialAnnouncements = await listAnnouncements();

  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <TopBar userName={session.name} active="/announcements" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <p className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
          [ COMMAND BROADCAST ]
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[0.05em] text-[var(--fg)]">
          ANNOUNCEMENTS
        </h1>
        <div className="mt-8">
          <AnnouncementsBoard
            initialAnnouncements={initialAnnouncements.map((a) => ({
              ...a,
              createdAt: a.createdAt.toISOString(),
            }))}
          />
        </div>
      </main>
    </div>
  );
}
