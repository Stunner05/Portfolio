import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Project } from "@prisma/client";
import { id } from "zod/v4/locales";
import { Message } from "../../../../generated/prisma/index";
export async function fetchProjects() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { createdAt: "asc" },
		});
		return projects;
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
}
export async function countProjects() {
	try {
		const total = await prisma.project.count();
		return total;
	} catch (error) {
		console.error("Error counting projects:", error);
		throw error;
	}
}

export async function getMessages() {
	try {
		const messages = await prisma.message.findMany({
			orderBy: { createdAt: "desc" },
		});
		return messages;
	} catch (error) {
		console.error("Error fetching messages:", error);
		throw error;
	}
}

export async function createProject(data: Project) {
	try {
		const project = await prisma.project.create({
			data,
		});
		return project;
	} catch (error) {
		console.error("Error creating project:", error);
		throw error;
	}
}

export async function GET() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { createdAt: "desc" },
		});

		const counts = {
			total: await prisma.project.count(),
			completed: await prisma.project.count({ where: { status: "COMPLETED" } }),
			inProgress: await prisma.project.count({
				where: { status: "IN_PROGRESS" },
			}),
			planned: await prisma.project.count({ where: { status: "PLANNED" } }),
		};

		return NextResponse.json({ projects, counts });
	} catch (error) {
		console.error("Error fetching admin projects:", error);
		return NextResponse.json(
			{ error: "Failed to fetch admin projects" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const projectId = params.id;
		const payload = await req.json();
		const { title, description, year, tech, image, demo, github, status } =
			payload;
		const project = await prisma.project.update({
			where: { id: projectId },
			data: {
				...(title && { title }),
				...(description && { description }),
				...(image && { image }),
				...(year && { year }),
				...(tech && { tech }),
				...(demo && { demo }),
				...(github && { github }),
				...(status && { status }),
			},
		});

		if (Object.keys(payload).length) {
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

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
// 	try {
// 		const projectId = params.id;
// 		const data = await req.json();
// 		const project = await prisma.project.update({
// 			where: { id: projectId },
// 			data,
// 		});
// 		return NextResponse.json(project);
// 	} catch (error) {
// 		console.error("Error updating project:", error);
// 		return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
// 	}
// }
