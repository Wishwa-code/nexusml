"use client";

import { useState, type FormEvent } from "react";
import type { Announcement } from "@/lib/types";

export function AnnouncementForm({
  onCreated,
}: {
  onCreated: (announcement: Announcement) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "Could not post the announcement.");
        return;
      }

      onCreated(data.announcement);
      setTitle("");
      setBody("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border border-[var(--border)] bg-[var(--bg-raised)] p-5"
    >
      <h2 className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
        [ NEW BROADCAST ]
      </h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="TITLE"
        required
        className="border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's the update?"
        required
        rows={3}
        className="resize-none border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
      />
      {error && <p className="text-sm text-[var(--accent)]">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-[10px] font-bold tracking-[0.1em] text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "TRANSMITTING…" : "[ POST BROADCAST ]"}
      </button>
    </form>
  );
}
