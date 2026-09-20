import Link from "next/link";

export function DashboardCard({
  href,
  label,
  stat,
  description,
}: {
  href: string;
  label: string;
  stat: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between border border-[var(--border)] bg-[var(--bg-raised)] p-6 transition-colors hover:border-[var(--accent)]"
    >
      <div>
        <p className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
          [ MODULE ]
        </p>
        <h2 className="mt-2 text-xl font-extrabold tracking-[0.05em] text-[var(--fg)]">
          {label}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-[var(--fg-dim)]">
          {description}
        </p>
      </div>
      <div className="mt-6 flex items-baseline justify-between border-t border-[var(--border)] pt-3">
        <span className="text-2xl font-extrabold text-[var(--fg)]">{stat}</span>
        <span className="text-[10px] tracking-[0.1em] text-[var(--fg-dim)] transition-colors group-hover:text-[var(--accent)]">
          ENTER &gt;&gt;&gt;
        </span>
      </div>
    </Link>
  );
}
