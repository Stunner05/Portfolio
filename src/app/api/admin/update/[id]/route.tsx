import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	console.log("this update route was hit");
	try {
		const projectId = Number(params.id);
		if (!projectId)
			return NextResponse.json({ error: "id is required", status: 500 });
		const payload = await req.json();
		const { title, description, year, tech, image, demo, github, status } =
			payload;
		console.log("🚀 ~ PUT ~ image:", image);
		const imageUrls = Array.isArray(image)
			? image.map((img: { url: string }) => img.url)
			: image;
		const project = await prisma.project.update({
			where: { id: projectId },
			data: {
				...(title && { title }),
				...(description && { description }),
				...(image && {
					image: {
						set: imageUrls,
					},
				}),
				...(year && { year }),
				...(tech && { tech }),
				...(demo && { demo }),
				...(github && { github }),
				...(status && { status }),
			},
		});
		if (!Object.keys(payload).length) {
			return NextResponse.json(
				{ message: "empty parameters", status: false },
				{ status: 400 }
			);
		}
		if (!project) {
			return NextResponse.json(
				{ Message: "project not found", status: false },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{
				Message: "data updated successfully",
				status: true,
				project,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			message: "failed to update project",
			error,
			status: 500,
		});
	}
}
