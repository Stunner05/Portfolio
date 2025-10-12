import React from "react";
import EditForm from "../../../components/EditForm";
import axios from "axios";
import { id } from "zod/v4/locales";
import { API_URL } from "@/lib/config";
import { getApiUrl } from "@/lib/config";

export default async function ProjectDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	try {
  const apiUrl = getApiUrl(`api/projects/${params.id}`);
		const res = await axios.get(apiUrl);
    if (res.status)
    {
const projectData =res.data


	return (
		<>
			<EditForm project={projectData} />
		</>
	);
    }
	} catch (error) {
		console.log("unable to fetch project data", error);
	}

	return <h1>Unable to fetch Data</h1>
}
