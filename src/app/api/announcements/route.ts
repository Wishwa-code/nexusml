import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import { createAnnouncement, listAnnouncements } from "@/lib/announcements";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const announcements = await listAnnouncements();
  return NextResponse.json({ announcements });
}

export async function POST(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const text = typeof body?.body === "string" ? body.body.trim() : "";

  if (!title || !text) {
    return NextResponse.json(
      { error: "Title and body are required." },
      { status: 400 }
    );
  }

  const announcement = await createAnnouncement(session.userId, title, text);
  return NextResponse.json({ announcement }, { status: 201 });
}
