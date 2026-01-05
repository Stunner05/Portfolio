import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();

		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const year = Number(formData.get("year"));
		const techString = formData.get("tech") as string;
		const github = formData.get("github") as string;
		const status = formData.get("status") as Status;
		const demo = formData.get("demo") as string;

		const imageJson = formData.get("image") as string;
		const image = JSON.parse(imageJson) as string[]; // 👈 URLs from uploader

		const tech = techString?.split(",").map((t) => t.trim()) || [];

		if (
			!title ||
			!description ||
			!year ||
			!tech.length ||
			!status ||
			!image.length
		) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		const project = await prisma.project.create({
			data: {
				title,
				description,
				year,
				tech,
				demo,
				github,
				status,
				image, // 👈 stored as array of URLs
			},
		});

		return NextResponse.json(
			{ project, message: "Project created successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error creating project:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
