import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

const NAV_ITEMS = [
  { href: "/dashboard", label: "DASHBOARD" },
  { href: "/team", label: "TEAM" },
  { href: "/announcements", label: "ANNOUNCEMENTS" },
  { href: "/docs", label: "DOCS" },
] as const;

export function TopBar({
  userName,
  active,
}: {
  userName: string;
  active: (typeof NAV_ITEMS)[number]["href"];
}) {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm font-extrabold tracking-[0.15em] text-[var(--fg)]">
              NEXUSML <span className="text-[var(--accent)]">{"// COMMAND"}</span>
            </p>
            <p className="mt-0.5 text-[10px] tracking-[0.1em] text-[var(--fg-dim)]">
              OPERATIVE: {userName.toUpperCase()}
            </p>
          </div>
          <nav className="flex flex-wrap gap-1 text-[10px] tracking-[0.1em]">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === active;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border px-2.5 py-1.5 transition-colors ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[#0a0a0a]"
                      : "border-[var(--border)] text-[var(--fg-dim)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                  }`}
                >
                  [ {item.label} ]
                </Link>
              );
            })}
          </nav>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
