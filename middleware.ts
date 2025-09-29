import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;
  
  // Check for NextAuth session cookie
  const sessionToken = request.cookies.get("authjs.session-token") || 
                      request.cookies.get("__Secure-authjs.session-token");
  const isAuthenticated = !!sessionToken;
  
  // Define protected routes (all routes under /(home))
  const protectedRoutes = [
    "/", // Home page
    "/account",
    "/book",
    "/explore", 
    "/favorites",
    "/library",
    "/notes",
    "/settings",
    "/stats"
  ];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });
  
  // If it's a protected route and user is not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to sign-in page
    const signInUrl = new URL("/sign-in", request.url);
    // Add the current path as a callback URL so user can be redirected back after login
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthenticated && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
