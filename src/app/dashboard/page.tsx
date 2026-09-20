import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { countTeamMembers } from "@/lib/team";
import { countAnnouncements } from "@/lib/announcements";
import { countDocuments } from "@/lib/documents";
import { TopBar } from "@/components/TopBar";
import { DashboardCard } from "@/components/DashboardCard";

export default async function DashboardPage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const [teamCount, announcementCount, documentCount] = await Promise.all([
    countTeamMembers(),
    countAnnouncements(),
    countDocuments(),
  ]);

  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <TopBar userName={session.name} active="/dashboard" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <p className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
          [ CLASSIFIED // LEVEL 4 CLEARANCE ]
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[0.05em] text-[var(--fg)]">
          COMMAND OVERVIEW
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--fg-dim)]">
          Select a module to access team roster, operational announcements, or
          the shared case-file archive.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-px bg-[var(--border)] sm:grid-cols-3">
          <DashboardCard
            href="/team"
            label="TEAM ROSTER"
            stat={String(teamCount).padStart(2, "0")}
            description="Active and standby field operatives assigned to this unit."
          />
          <DashboardCard
            href="/announcements"
            label="ANNOUNCEMENTS"
            stat={String(announcementCount).padStart(2, "0")}
            description="Command broadcasts and unit-wide operational updates."
          />
          <DashboardCard
            href="/docs"
            label="CASE FILES"
            stat={String(documentCount).padStart(2, "0")}
            description="Shared briefings, suspect profiles, and field protocols."
          />
        </div>
      </main>
    </div>
  );
}
