import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const { token } = req.nextauth;
        const isAuth = !!token;
        const isAdmin = token?.role === "admin";

        // Protect /admin routes
        if (pathname.startsWith("/admin") && !isAdmin) {
            return NextResponse.rewrite(new URL("/login", req.url));
        }

        // Protect sensitive /api routes (POST, PUT, DELETE)
        const sensitiveApiPaths = ["/api/products", "/api/categories", "/api/tags", "/api/users", "/api/articles", "/api/content", "/api/upload", "/api/register"];
        const isSensitivePath = sensitiveApiPaths.some(path => pathname.startsWith(path));
        
        if (isSensitivePath && req.method !== "GET" && !isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        // Special case: /api/users GET should also be admin only
        if (pathname.startsWith("/api/users") && req.method === "GET" && !isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => true, // Check logic inside middleware function for more control
        },
    }
);

export const config = { matcher: ["/admin/:path*", "/api/:path*"] };
