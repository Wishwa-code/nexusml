import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { getDocument } from "@/lib/documents";
import { TopBar } from "@/components/TopBar";
import { DocumentEditor } from "@/components/DocumentEditor";

export default async function DocumentPage(props: PageProps<"/docs/[id]">) {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const { id } = await props.params;
  const doc = await getDocument(id);
  if (!doc) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <TopBar userName={session.name} active="/docs" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/docs"
          className="text-[10px] tracking-[0.1em] text-[var(--fg-dim)] hover:text-[var(--accent)]"
        >
          &lt;&lt;&lt; BACK TO ARCHIVE
        </Link>
        <div className="mt-4">
          <DocumentEditor
            doc={{
              ...doc,
              createdAt: doc.createdAt.toISOString(),
              updatedAt: doc.updatedAt.toISOString(),
            }}
          />
        </div>
      </main>
    </div>
  );
}
