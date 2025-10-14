import React from "react";
import EditForm from "../../../components/EditForm";
import axios from "axios";
import { id } from "zod/v4/locales";
import { getProjectById } from "@/app/api/admin/projects/routes";

type Props = {
	params: { id: string };
};

export default async function ProjectDetailsPage({ params }: Props) {
	console.log("this is the edit page");

	const { id } = await params;
	try {
		const projectId = Number(id);

		const projectData = await getProjectById(projectId);
		console.log("🚀 ~ ProjectDetailsPage ~ projectData:", projectData);
		const formattedProject = {
			...projectData!,
			image: projectData!.image.map((url: string) => ({ url })),
		};

		if (!projectData) {
			return <p className="text-red-500">Project not found.</p>;
		}

		return (
			<>
				<EditForm project={formattedProject}  />
			</>
		);
	} catch (error) {
		console.log("unable to fetch project data", error);
	}

	return <h1>Unable to fetch Data</h1>;
}
