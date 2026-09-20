import "server-only";
import { prisma } from "@/lib/db";

export async function listTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { callsign: "asc" },
  });
}
