"use client";

import { useState } from "react";
import type { DocumentFull } from "@/lib/types";

export function DocumentEditor({ document }: { document: DocumentFull }) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const [updatedAt, setUpdatedAt] = useState(document.updatedAt);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/documents/${document.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) return;
      const data = await response.json();
      setUpdatedAt(data.document.updatedAt);
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  }

  const savedAt = new Date(updatedAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-3">
        <span className="text-[10px] tracking-[0.1em] text-[var(--fg-dim)]">
          {isDirty ? "● UNSAVED CHANGES" : `LAST SAVED ${savedAt}`}
        </span>
        <button
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="border border-[var(--accent)] bg-[var(--accent)] px-4 py-1.5 text-[10px] font-bold tracking-[0.1em] text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {isSaving ? "SAVING…" : "[ SAVE ]"}
        </button>
      </div>
      <div className="p-5">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsDirty(true);
          }}
          placeholder="UNTITLED FILE"
          className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 pb-3 text-xl font-extrabold tracking-[0.03em] text-[var(--fg)] outline-none focus:border-[var(--accent)]"
        />
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsDirty(true);
          }}
          placeholder="Begin typing…"
          rows={18}
          className="mt-5 w-full resize-none border-0 bg-transparent text-sm leading-relaxed text-[var(--fg)] outline-none"
        />
      </div>
    </div>
  );
}
