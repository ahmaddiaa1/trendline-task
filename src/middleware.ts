import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  // We also keep token in localStorage; middleware cannot read it, so optionally mirror into cookie on client.
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify");
  const isProtected = pathname.startsWith("/dashboard");

  if (!token && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && isAuthRoute && pathname !== "/verify") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/verify", "/dashboard"],
};
