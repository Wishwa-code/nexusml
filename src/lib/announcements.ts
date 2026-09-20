import "server-only";
import { prisma } from "@/lib/db";

export type AnnouncementWithAuthor = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  author: { name: string };
};

// Shared data-access layer used by both the Server Component page (initial
// read) and the API route handlers (read/write over HTTP), so the query
// shape and ordering only live in one place.
export async function listAnnouncements(): Promise<AnnouncementWithAuthor[]> {
  return prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });
}

export async function createAnnouncement(
  authorId: string,
  title: string,
  body: string
): Promise<AnnouncementWithAuthor> {
  return prisma.announcement.create({
    data: { title, body, authorId },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });
}
