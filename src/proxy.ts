import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";

const PUBLIC_ROUTES = ["/login"];

// Optimistic, cookie-only auth check that runs before every matched request.
// This is the first line of defense (fast redirects, no DB hit); each
// protected API route also re-verifies the session itself, since Proxy
// should never be the only check — see src/lib/dal.ts.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
