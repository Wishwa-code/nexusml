import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { listTeamMembers } from "@/lib/team";
import { TopBar } from "@/components/TopBar";
import { TeamTable } from "@/components/TeamTable";

export default async function TeamPage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const members = await listTeamMembers();

  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <TopBar userName={session.name} active="/team" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <p className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
          [ UNIT ROSTER ]
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[0.05em] text-[var(--fg)]">
          TEAM
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--fg-dim)]">
          Operatives currently assigned to this unit.
        </p>
        <div className="mt-8">
          <TeamTable members={members} />
        </div>
      </main>
    </div>
  );
}
