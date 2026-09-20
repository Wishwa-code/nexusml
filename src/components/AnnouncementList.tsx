import type { Announcement } from "@/lib/types";
import { AnnouncementCard } from "@/components/AnnouncementCard";

export function AnnouncementList({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) {
    return (
      <p className="border border-dashed border-[var(--border)] p-6 text-center text-xs tracking-[0.1em] text-[var(--fg-dim)]">
        NO BROADCASTS YET. BE THE FIRST TO POST ONE.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-px bg-[var(--border)]">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </ul>
  );
}
