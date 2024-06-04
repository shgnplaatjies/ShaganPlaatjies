import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/profile", "/settings"]);

const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: string;
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS ?? "").split(","),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN ?? "").split(","),
  allowedHeaders: (process.env?.ALLOWED_HEADERS ?? "").split(","),
  exposedHeaders: (process.env?.EXPOSED_HEADERS ?? "").split(","),
  maxAge: (process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE)) || undefined,
  credentials: process.env.CREDENTIALS === "true" ? "true" : "false",
};

const addCorsHeaders = (request: NextRequest, response: NextResponse) => {
  const origin = request.headers.get("origin") ?? "";
  if (
    corsOptions.allowedOrigins.includes("*") ||
    corsOptions.allowedOrigins.includes(origin)
  ) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set(
    "Access-Control-Allow-Credentials",
    corsOptions.credentials.toString()
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsOptions.allowedMethods.join(",")
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(",")
  );
  response.headers.set(
    "Access-Control-Expose-Headers",
    corsOptions.exposedHeaders.join(",")
  );
  response.headers.set(
    "Access-Control-Max-Age",
    corsOptions.maxAge?.toString() ?? ""
  );

  return response;
};

export async function middleware(request: NextRequest) {
  const updatedResponse = addCorsHeaders(request, NextResponse.next());
  return updatedResponse;
}

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/api/:path*"],
};
