import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.ADMIN_PASSWORD || "chalo-secret-key-2024");

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only protect /admin routes
  if (path.startsWith("/admin")) {
    const session = request.cookies.get("admin_session")?.value;

    // If trying to access login page while already authenticated, redirect to dashboard
    if (path === "/admin/login") {
      if (session) {
        try {
          await jwtVerify(session, SECRET);
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch (error) {
          // Token invalid, allow access to login page
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    // Protect other /admin routes
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(session, SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
