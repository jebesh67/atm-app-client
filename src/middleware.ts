import { NextRequest, NextResponse } from "next/server";
import { RequestWithCookies, verifyAccess } from "elden-js";

const backendURL = `${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/check-auth`;
const cookieName = "token";

const backendAdminURL = `${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/admin/check-auth`;
const adminCookieName = "adminToken";

const protectedRoutes = {
  admin: {
    paths: ["/admin", "/admin/customers", "/admin/deposits", "/admin/withdrawals"],
    redirect: "/admin/login",
  },
  user: {
    paths: ["/", "/withdraw", "/deposit", "/balance"],
    redirect: "/login",
  },
};

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const {pathname} = req.nextUrl;
  const typedReq = req as unknown as RequestWithCookies;
  
  if (protectedRoutes.admin.paths.some((path: string): boolean => pathname.startsWith(path))) {
    const access = await verifyAccess(backendAdminURL, adminCookieName, typedReq);
    if (!access.accessStatus) {
      console.log("redirected to /admin/login");
      return NextResponse.redirect(
        new URL(protectedRoutes.admin.redirect, req.url),
      );
    }
  } else if (protectedRoutes.user.paths.some((path: string): boolean => pathname.startsWith(path))) {
    const access = await verifyAccess(backendURL, cookieName, typedReq);
    if (!access.accessStatus) {
      console.log("redirected to /login");
      return NextResponse.redirect(
        new URL(protectedRoutes.user.redirect, req.url),
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/withdraw/:path*",
    "/deposit/:path*",
    "/balance/:path*",
    "/admin",
    "/admin/customers/:path*",
    "/admin/deposits/:path*",
    "/admin/withdrawals/:path*",
  ],
};
