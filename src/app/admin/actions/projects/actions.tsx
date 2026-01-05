"use client";
import DeleteProjectModal from "../../components/deleteProject";

export function ProjectActions({
	projectTitle,
	projectId,
}: {
	projectTitle: string;
	projectId: string;
}) {
	return (
		<DeleteProjectModal
			projectTitle={projectTitle}
			projectId={parseInt(projectId)}
		/>
	);
}
