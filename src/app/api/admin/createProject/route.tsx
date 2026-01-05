import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

async function uploadToCloudinary(file: File, retries = 3): Promise<string> {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const result = await new Promise<any>((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: "portfolio_projects" }, (err, res) => {
						if (err) reject(err);
						else resolve(res);
					})
					.end(buffer);
			});
			return result.secure_url;
		} catch (err) {
			console.error(`Cloudinary upload attempt ${attempt} failed`, err);
			if (attempt === retries)
				throw new Error("Failed to upload image to Cloudinary");
			// wait 1 second before retry
			await new Promise((r) => setTimeout(r, 1000));
		}
	}
	throw new Error("Cloudinary upload failed after retries");
}

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
		const tech = techString?.split(",").map((t) => t.trim()) || [];
		const files = formData.getAll("image") as File[];
		const uploadImages: string[] = [];

		// Validation
		if (!title || !description || !year || !tech.length || !status) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Upload images with retry logic
		for (const file of files) {
			try {
				const url = await uploadToCloudinary(file);
				uploadImages.push(url);
			} catch (err) {
				console.error("Failed to upload an image:", err);
				return NextResponse.json(
					{ message: "Failed to upload one or more images" },
					{ status: 500 }
				);
			}
		}

		// Create project in DB
		const project = await prisma.project.create({
			data: {
				title,
				description,
				year,
				tech,
				demo,
				github,
				status,
				image: uploadImages,
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
