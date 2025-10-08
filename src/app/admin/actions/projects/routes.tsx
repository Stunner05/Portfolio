"use server";

import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function getDashboardData() {
	try {
		const projectsCount = await prisma.project.count();
		// const blogCount = await prisma.blog.count();
		const messagesCount = await prisma.message.count();

		const recentProjects = await prisma.project.findMany({
			orderBy: { createdAt: "desc" },
			take: 3,
		});

		// const recentBlogs = await prisma.blog.findMany({
		// 	orderBy: { createdAt: "desc" },
		// 	take: 3,
		// });

		const recentMessages = await prisma.message.findMany({
			orderBy: { createdAt: "desc" },
			take: 3,
		});

		return {
			projectsCount,
			// blogCount,
			messagesCount,
			recentProjects,
			recentMessages,
		};
	} catch (err) {
		console.error("Error fetching dashboard data:", err);
		throw err;
	}
}

export async function getAdminProjects() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { createdAt: "desc" },
		});

		const counts = {
			total: await prisma.project.count(),
			completed: await prisma.project.count({
				where: { status: "COMPLETED" },
			}),
			inProgress: await prisma.project.count({
				where: { status: "IN_PROGRESS" },
			}),
			planned: await prisma.project.count({ where: { status: "PLANNED" } }),
		};
		return { projects, counts };
	} catch (error) {
		console.error("Error fetching admin projects:", error);
		throw new Error("Failed to fetch admin projects");
	}
}
