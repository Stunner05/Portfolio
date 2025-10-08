import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Use an interface for typing incoming request body
interface LoginRequestBody {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	try {
		const { email, password }: LoginRequestBody = await req.json();
		console.log("Incoming login:", { email, password });

		if (!email || !password)
			return NextResponse.json({ error: "Missing fields" }, { status: 400 });

		const SECRET = process.env.ADMIN_SECRET_KEY;
		console.log("SECRET available:", !!SECRET);

		if (!SECRET) {
			return NextResponse.json(
				{ error: "Missing secret key in environment variables" },
				{ status: 500 }
			);
		}

		const admin = await prisma.admin.findUnique({ where: { email } });
		console.log("Admin found:", !!admin);

		if (!admin)
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);

		const valid = await bcrypt.compare(password, admin.password);
		console.log("Password valid:", valid);

		if (!valid)
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);

		const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET, {
			expiresIn: "1d",
		});
		console.log("Token generated:", !!token);

		const response = NextResponse.json({ success: true });
		response.cookies.set("admin_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24,
		});

		return response;
	} catch (error: unknown) {
		console.error("Login failed:", error);
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
