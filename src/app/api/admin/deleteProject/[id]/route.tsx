import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { Message } from "../../../../../generated/prisma/index";
import { success } from "zod";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		console.log("DELETE request received for deleting project");
		const id = params.id;
		console.log("🚀 ~ DELETE ~ id:", id);
		if (!id) {
			return NextResponse.json(
				{ error: "Project ID is required" },
				{ status: 400 }
			);
		}
		const projectId = Number(id);
		if (isNaN(projectId)) {
			return NextResponse.json(
				{ error: "Invalid Project ID" },
				{ status: 400 }
			);
		}
		// Find the project to delete
		const project = await prisma.project.findUnique({
			where: { id: projectId },
		});
		console.log("project to delete:", project);
		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// If the project has images (array of URLs)
		if (project.image && Array.isArray(project.image)) {
			for (const url of project.image) {
				try {
					const parts = url.split("/");
					const fileName = parts[parts.length - 1]; // e.g. "yooh7ogsk2iekvslu31y.png"
					const publicId = fileName.split(".")[0]; // e.g. "yooh7ogsk2iekvslu31y"
					const result = await cloudinary.uploader.destroy(
						`portfolio_projects/${publicId}`
					);
					console.log("Cloudinary delete result:", result);
				} catch (err: any) {
					console.warn("Cloudinary image delete failed:", err.message);
				}
			}
		}
		// Delete the project record
		await prisma.project.delete({
			where: { id: projectId },
		});
		console.log("Project deleted successfully:", projectId);
		return NextResponse.json(
			{ success: true, message: "Project deleted successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error deleting project:", error, error.stack);
		return NextResponse.json(
			{ error: "Failed to delete project" },
			{ status: 500 }
		);
	}
}
