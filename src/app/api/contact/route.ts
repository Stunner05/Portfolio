import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const { name, email, message } = await req.json();

		if (!name || !email || !message) {
			return NextResponse.json(
				{ success: false, error: "All fields are required." },
				{ status: 400 }
			);
		}

		await prisma.message.create({
			data: { name, email, content: message },
		});

		console.log("📩 New contact form submission:", { name, email, message });

		return NextResponse.json({
			success: true,
			message: "Thanks for reaching out! I'll get back to you soon.",
		});
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Something went wrong. Please try again later.",
			},
			{ status: 500 }
		);
	}
}
