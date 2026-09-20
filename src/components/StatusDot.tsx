const STATUS_COLOR: Record<string, string> = {
  ACTIVE: "var(--ok)",
  STANDBY: "var(--fg-dim)",
  OFFLINE: "var(--accent)",
};

export function StatusDot({ status }: { status: string }) {
  const color = STATUS_COLOR[status] ?? "var(--fg-dim)";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="inline-block h-2 w-2"
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] tracking-[0.1em]" style={{ color }}>
        {status}
      </span>
    </span>
  );
}
