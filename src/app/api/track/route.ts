import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
	try {
		const { page } = await req.json();
		const ipAddress =
			req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
		const userAgent = req.headers.get("user-agent") || "unknown";
		await prisma.visits.create({
			data: {
				ipAddress,
				userAgent,
				Page: page,
			},
		});
		return NextResponse.json({
			success: true,
			message: "Successfully created visit",
		});
	} catch (error) {
		console.error("error creating visits", error);
		return NextResponse.json({
			error: "Couldnt track visits ",
			status: 500,
		});
	}
}
