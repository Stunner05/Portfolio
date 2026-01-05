"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

type DeleteProjectModalProps = {
	projectId: number;
	projectTitle?: string;
	onDeleted?: () => void; // callback to refresh UI after delete
};

export default function DeleteProjectModal({
	projectId,
	projectTitle,
	onDeleted,
}: DeleteProjectModalProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleDelete = async () => {
		setLoading(true);
		try {
			const res = await axios.delete(`/api/admin/deleteProject/${projectId}`);
			const data = await res.data;
			if (res.data.success) {
				toast.success("Project deleted successfully");
				setOpen(false);
				router.refresh();
			} else {
				toast.error(data.error || "Failed to delete project");
			}
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<Button
				className="cursor-pointer bg-red-500 text-white"
				onClick={() => setOpen(true)}
			>
				Delete
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Delete Project</DialogTitle>
					</DialogHeader>

					<p className="text-sm text-muted-foreground">
						Are you sure you want to delete{" "}
						<span className="font-medium text-foreground">
							{projectTitle || "this project"}
						</span>
						? This action cannot be undone.
					</p>

					<DialogFooter className="mt-4 flex justify-end gap-2">
						<Button
							className="cursor-pointer"
							variant="outline"
							onClick={() => setOpen(false)}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button
							className="cursor-pointer"
							variant="destructive"
							onClick={handleDelete}
							disabled={loading}
						>
							{loading ? "Deleting..." : "Delete"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
