"use client";

import { useState } from "react";
import type { Announcement } from "@/lib/types";
import { AnnouncementForm } from "@/components/AnnouncementForm";
import { AnnouncementList } from "@/components/AnnouncementList";

export function AnnouncementsBoard({
  initialAnnouncements,
}: {
  initialAnnouncements: Announcement[];
}) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function refresh() {
    setIsRefreshing(true);
    try {
      const response = await fetch("/api/announcements");
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data.announcements);
      }
    } finally {
      setIsRefreshing(false);
    }
  }

  function handleCreated(announcement: Announcement) {
    setAnnouncements((current) => [announcement, ...current]);
  }

  return (
    <div className="flex flex-col gap-8">
      <AnnouncementForm onCreated={handleCreated} />
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
        <h2 className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
          [ FEED ]
        </h2>
        <button
          onClick={refresh}
          disabled={isRefreshing}
          className="text-[10px] tracking-[0.1em] text-[var(--fg-dim)] hover:text-[var(--accent)] disabled:opacity-60"
        >
          {isRefreshing ? "REFRESHING…" : "[ REFRESH ]"}
        </button>
      </div>
      <AnnouncementList announcements={announcements} />
    </div>
  );
}
