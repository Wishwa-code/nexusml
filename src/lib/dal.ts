import "server-only";
import { cache } from "react";
import { getSession, type SessionPayload } from "@/lib/session";

// Centralizes "who is the current user" so every Server Component, Server
// read, and Route Handler checks the session the same way. cache() memoizes
// the cookie read/verify for the lifetime of a single request.
export const verifySession = cache(
  async (): Promise<SessionPayload | null> => {
    return getSession();
  }
);
