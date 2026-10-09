import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// /product/* আর /profile/* protected — login ছাড়া ঢুকলে /signin এ পাঠানো হবে (toast signin page এ দেখাবে)
export function middleware(request) {
  const session = getSessionCookie(request);
  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    url.searchParams.set("reason", "protected");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
