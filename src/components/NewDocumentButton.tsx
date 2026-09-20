"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewDocumentButton() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreate() {
    setIsCreating(true);
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "UNTITLED FILE", content: "" }),
      });
      if (!response.ok) return;
      const data = await response.json();
      router.push(`/docs/${data.document.id}`);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <button
      onClick={handleCreate}
      disabled={isCreating}
      className="border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-[10px] font-bold tracking-[0.1em] text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {isCreating ? "CREATING…" : "+ NEW FILE"}
    </button>
  );
}
