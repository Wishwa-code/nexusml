"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="border border-[var(--border-strong)] px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] text-[var(--fg-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-60"
    >
      {isLoggingOut ? "TERMINATING…" : "[ LOG OUT ]"}
    </button>
  );
}
