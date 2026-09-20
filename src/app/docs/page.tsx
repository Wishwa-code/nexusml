import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { listDocuments } from "@/lib/documents";
import { TopBar } from "@/components/TopBar";
import { DocumentList } from "@/components/DocumentList";
import { NewDocumentButton } from "@/components/NewDocumentButton";

export default async function DocsPage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const documents = await listDocuments();

  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <TopBar userName={session.name} active="/docs" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
              [ SHARED ARCHIVE ]
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[0.05em] text-[var(--fg)]">
              CASE FILES
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--fg-dim)]">
              Briefings, suspect profiles, and field protocols. Open a file to
              read or edit it.
            </p>
          </div>
          <NewDocumentButton />
        </div>
        <div className="mt-8">
          <DocumentList
            documents={documents.map((d) => ({
              ...d,
              createdAt: d.createdAt.toISOString(),
              updatedAt: d.updatedAt.toISOString(),
            }))}
          />
        </div>
      </main>
    </div>
  );
}
