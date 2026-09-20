import "server-only";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import type { SessionPayload } from "@/lib/session";

// Verifies email/password against the User table. Returns the data needed
// for the session payload, or null if the credentials don't match — the
// caller decides how to report that (we don't leak which part was wrong).
export async function verifyCredentials(
  email: string,
  password: string
): Promise<SessionPayload | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) return null;

  return { userId: user.id, name: user.name, email: user.email };
}
