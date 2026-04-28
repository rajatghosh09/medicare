import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const token = request.cookies.get("token")?.value;
//   const role = request.cookies.get("role")?.value;

//   const isLoginPage = pathname === "/signin";
//   const isAdminRoute = pathname.startsWith("/admin");

//   if (isLoginPage && token) {
//     if (role === "admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }

//     if (role === "patient") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (role === "doctor") {
//       return NextResponse.redirect(new URL("/doctor/dashboard", request.url));
//     }
//   }

//   if (!token && request.nextUrl.pathname.startsWith("/admin")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // 1. Define your Auth pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // 2. If user is logged in and tries to access login/signup, redirect them away
  if (isAuthPage && token) {
    if (role === "admin")
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (role === "doctor")
      return NextResponse.redirect(new URL("/doctor/dashboard", request.url));
    return NextResponse.redirect(new URL("/", request.url)); // Patients
  }

  // 3. Protect Doctor & Admin routes from unauthenticated users
  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/doctor"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// 4. Important: Add a config to the middleware to avoid running on every single image/asset
export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/login", "/signup", "/"],
};
