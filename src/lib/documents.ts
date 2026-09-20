import "server-only";
import { prisma } from "@/lib/db";

const summarySelect = {
  id: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  author: { select: { name: true } },
} as const;

const fullSelect = {
  ...summarySelect,
  content: true,
} as const;

export async function listDocuments() {
  return prisma.document.findMany({
    orderBy: { updatedAt: "desc" },
    select: summarySelect,
  });
}

export async function getDocument(id: string) {
  return prisma.document.findUnique({ where: { id }, select: fullSelect });
}

export async function createDocument(authorId: string, title: string, content: string) {
  return prisma.document.create({
    data: { title, content, authorId },
    select: fullSelect,
  });
}

export async function updateDocument(id: string, title: string, content: string) {
  return prisma.document.update({
    where: { id },
    data: { title, content },
    select: fullSelect,
  });
}
