import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse, userAgent } from "next/server";

const isProtectedRoute = createRouteMatcher(["/profile", "/settings"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/api/:path*"],
};

export const detectOS = (request: NextRequest) => {
  const { os } = userAgent(request);

  const response = NextResponse.next();

  response.headers.set("x-user-os", os.name || "unknown");

  return response;
};
