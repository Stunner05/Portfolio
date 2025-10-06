import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Project } from "@/generated/prisma";
export async function fetchProjects() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { createdAt: "desc" },
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
