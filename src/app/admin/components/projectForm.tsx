"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ImageUploader from "./imageUploader"; // Add this import

const projectSchema = z.object({
	title: z.string().min(3, { message: "Title must be at least 3 characters" }),
	description: z
		.string()
		.min(10, { message: "Description must be at least 10 characters" }),
	year: z
		.string()
		.regex(/^\d{4}$/, "Year must be a 4-digit number")
		.refine((val) => parseInt(val) >= 2000, {
			message: "Enter a valid year (>= 2000)",
		}),
	tech: z.string().min(2, { message: "At least one technology is required" }),
	image: z
		.array(z.string().url())
		.min(1, { message: "Please upload at least one image" }), // Updated to array of URLs
	demo: z.string().url({ message: "Demo must be a valid URL" }),
	github: z.string().url({ message: "GitHub must be a valid URL" }),
	status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED"], {
		message: "Invalid status",
	}),
});
type ProjectFormValues = z.infer<typeof projectSchema>;
export default function AddProject() {
	const router = useRouter();
	const form = useForm<ProjectFormValues>({
		mode: "onChange",
		reValidateMode: "onBlur",
		resolver: zodResolver(projectSchema),
		defaultValues: {
			title: "",
			description: "",
			year: "",
			tech: "",
			image: [], // Empty array
			demo: "",
			github: "",
			status: "PLANNED",
		},
	});
	const onSubmit = async (data: ProjectFormValues) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("year", data.year);
			formData.append("tech", data.tech);
			formData.append("demo", data.demo);
			formData.append("github", data.github);
			formData.append("status", data.status);
			formData.append("image", JSON.stringify(data.image)); // Send as JSON string
			console.log(" Project saved:", data);
			const res = await axios.post("/api/admin/createProject", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (res.status === 200) {
				console.log(" Project saved successfully");
			}
			toast.success(" Project created successfully");
			setOpen(false);
			form.reset();
			router.refresh();
		} catch (error) {
			toast.error(" Failed to create project");
			console.error(" Failed to save project:", error);
		} finally {
			setLoading(false);
		}
	};
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="cursor-pointer" onClick={() => setOpen(true)}>
					Add Project
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>Add a New Project</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="My Awesome Project" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="Describe your project..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="year"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Year</FormLabel>
									<FormControl>
										<Input placeholder="2025" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tech"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Technologies</FormLabel>
									<FormControl>
										<Input placeholder="React, Node.js, etc." {...field} />
									</FormControl>
									<FormDescription>Comma separated list</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="image"
							render={({ fieldState }) => (
								<FormItem>
									<FormLabel>Image Upload</FormLabel>
									<FormControl>
										<ImageUploader
											onUploadComplete={(urls) => {
												form.setValue("image", urls); // Set URLs in form
											}}
											initialImages={[]} // Empty for new projects
										/>
									</FormControl>
									{fieldState.error && (
										<p className="text-red-500 text-sm mt-1">
											{fieldState.error.message}
										</p>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="demo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Demo Link</FormLabel>
									<FormControl>
										<Input placeholder="https://example.com/demo" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="github"
							render={({ field }) => (
								<FormItem>
									<FormLabel>GitHub Link</FormLabel>
									<FormControl>
										<Input
											placeholder="https://github.com/username/project"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<select {...field} className="border rounded-md p-2 w-full">
											<option value="PLANNED">Planned</option>
											<option value="IN_PROGRESS">In Progress</option>
											<option value="COMPLETED">Completed</option>
										</select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={loading || form.watch("image").length === 0} // Disable if no images uploaded
						>
							{loading ? "Saving..." : "Save Project"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
