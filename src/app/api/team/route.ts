import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import { listTeamMembers } from "@/lib/team";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const members = await listTeamMembers();
  return NextResponse.json({ members });
}
