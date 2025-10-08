import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET_KEY); // must match what you used in login API

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const token = req.cookies.get("admin_token")?.value;
	// Paths to protect
	const isAdminPath = path.startsWith("/admin");
	const isLoginPath = path === "/admin/login";

	// If user tries to visit login page but already logged in
	if (isLoginPath && token) {
		try {
			await jwtVerify(token, SECRET);
			console.log("✅ Valid token — redirecting to /admin");
			return NextResponse.redirect(new URL("/admin", req.url));
		} catch {
			console.log(" Invalid token — allow login page to show");
			return NextResponse.next();
		}
	}

	// If accessing any /admin path (except login)
	if (isAdminPath && !isLoginPath) {
		if (!token) {
			console.log(" No token — redirect to /admin/login");
			return NextResponse.redirect(new URL("/admin/login", req.url));
		}

		try {
			await jwtVerify(token, SECRET);
			console.log("✅ Token valid — allow access");
			return NextResponse.next();
		} catch (err) {
			console.log("Invalid token — redirect to /admin/login", err);
			return NextResponse.redirect(new URL("/admin/login", req.url));
		}
	}

	// Allow other routes (like home, api, etc.)
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
