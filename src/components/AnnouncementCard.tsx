import type { Announcement } from "@/lib/types";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const postedAt = new Date(announcement.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <li className="border border-[var(--border)] bg-[var(--bg-raised)] p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold tracking-[0.02em] text-[var(--fg)]">
          {announcement.title}
        </h3>
        <span className="shrink-0 text-[10px] tracking-[0.05em] text-[var(--fg-dim)]">
          {postedAt}
        </span>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--fg-dim)]">
        {announcement.body}
      </p>
      <p className="mt-3 text-[10px] tracking-[0.1em] text-[var(--fg-faint)]">
        — {announcement.author.name.toUpperCase()}
      </p>
    </li>
  );
}
