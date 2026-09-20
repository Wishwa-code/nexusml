import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-sm border border-[var(--border)] bg-[var(--bg-raised)] p-8">
        <p className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
          [ RESTRICTED ACCESS ]
        </p>
        <h1 className="mt-2 text-xl font-extrabold tracking-[0.05em] text-[var(--fg)]">
          NEXUSML <span className="text-[var(--accent)]">{"// COMMAND"}</span>
        </h1>
        <p className="mt-1 text-xs text-[var(--fg-dim)]">
          Authenticate to access the operations portal.
        </p>
        <LoginForm />
        <p className="mt-6 text-[10px] tracking-[0.05em] text-[var(--fg-faint)]">
          DEMO CREDENTIALS: admin@nexusml.dev / password123
        </p>
      </div>
    </div>
  );
}
