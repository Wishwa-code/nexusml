import { StatusDot } from "@/components/StatusDot";
import type { TeamMember } from "@/lib/types";

export function TeamTable({ members }: { members: TeamMember[] }) {
  if (members.length === 0) {
    return (
      <p className="border border-dashed border-[var(--border)] p-6 text-center text-xs tracking-[0.1em] text-[var(--fg-dim)]">
        NO OPERATIVES ON RECORD.
      </p>
    );
  }

  return (
    <div className="border border-[var(--border)]">
      <div className="grid grid-cols-[minmax(0,1fr)_2fr_2fr_minmax(0,1fr)] gap-px bg-[var(--border)] text-[10px] tracking-[0.1em] text-[var(--fg-dim)]">
        <div className="bg-[var(--bg-raised)] px-4 py-2">CALLSIGN</div>
        <div className="bg-[var(--bg-raised)] px-4 py-2">NAME</div>
        <div className="bg-[var(--bg-raised)] px-4 py-2">ROLE</div>
        <div className="bg-[var(--bg-raised)] px-4 py-2">STATUS</div>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_2fr_2fr_minmax(0,1fr)] gap-px bg-[var(--border)]">
        {members.map((member) => (
          <div key={member.id} className="contents">
            <div className="bg-[var(--bg)] px-4 py-3 text-sm font-bold text-[var(--fg)]">
              {member.callsign}
            </div>
            <div className="bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)]">
              {member.name}
            </div>
            <div className="bg-[var(--bg)] px-4 py-3 text-xs tracking-[0.05em] text-[var(--fg-dim)]">
              {member.role}
            </div>
            <div className="bg-[var(--bg)] px-4 py-3">
              <StatusDot status={member.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
