import "server-only";
import { prisma } from "@/lib/db";
import type { TeamMember } from "@/lib/types";

export async function listTeamMembers(): Promise<TeamMember[]> {
  return prisma.teamMember.findMany({
    orderBy: { callsign: "asc" },
    select: {
      id: true,
      callsign: true,
      name: true,
      role: true,
      status: true,
    },
  });
}

export async function countTeamMembers(): Promise<number> {
  return prisma.teamMember.count();
}
