import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { User } from "lucide-react";
import { Prisma, Status } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
	try {
		// const session = await getServerSess
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json(
				{
					message: "user is not logged in",
				},
				{
					status: 401,
				}
			);
		}
		const formData = await req.formData();
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const year = Number(formData.get("year"));
		const techString = formData.get("tech") as string;
		const github = formData.get("github") as string;
		const status = formData.get("status") as Status;
		const demo = formData.get("demo") as string;
		const tech = techString.split(",").map((t: string) => t.trim());
		const files = formData.getAll("image") as File[];
		const uploadImages: string[] = [];
		if (!title || !description || !year || !techString || !status) {
			return NextResponse.json(
				{
					message: "Missing required fields",
				},
				{
					status: 400,
				}
			);
		}
		for (const file of files) {
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const result = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: "portfolio_projects" }, (err, res) => {
						if (err) reject(err);
						else resolve(res);
					})
					.end(buffer);
			});
			uploadImages.push((result as any).secure_url);
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
				image: uploadImages,
			},
		});
		return NextResponse.json(
			{ project, message: "project created successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("something went wrong error", error);
		return NextResponse.json(
			{
				message: "Error creating project",
			},
			{ status: 500 }
		);
	}
}
