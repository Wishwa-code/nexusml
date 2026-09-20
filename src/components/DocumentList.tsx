import Link from "next/link";
import type { DocumentSummary } from "@/lib/types";

export function DocumentList({ documents }: { documents: DocumentSummary[] }) {
  if (documents.length === 0) {
    return (
      <p className="border border-dashed border-[var(--border)] p-6 text-center text-xs tracking-[0.1em] text-[var(--fg-dim)]">
        ARCHIVE EMPTY. CREATE THE FIRST FILE.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {documents.map((doc) => {
        const updatedAt = new Date(doc.updatedAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        });
        return (
          <li key={doc.id}>
            <Link
              href={`/docs/${doc.id}`}
              className="group flex h-full flex-col justify-between border border-[var(--border)] bg-[var(--bg-raised)] p-5 transition-colors hover:border-[var(--accent)]"
            >
              <div>
                <p className="text-[10px] tracking-[0.1em] text-[var(--fg-dim)]">
                  [ FILE ]
                </p>
                <h3 className="mt-2 text-sm font-bold text-[var(--fg)] group-hover:text-[var(--accent)]">
                  {doc.title || "UNTITLED FILE"}
                </h3>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-2 text-[10px] tracking-[0.05em] text-[var(--fg-dim)]">
                <span>{doc.author.name.toUpperCase()}</span>
                <span>UPD {updatedAt}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
