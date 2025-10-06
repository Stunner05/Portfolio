"use client";
import { useState } from "react";
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
// ✅ Schema
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
	image: z.array(
		z.file().max(1_00_000).mime(["image/png", "image/jpeg", "image/webp"], {
			message: "Only PNG, JPG, or WebP images allowed",
		})
	),
	demo: z.string().url({ message: "Demo must be a valid URL" }),
	github: z.string().url({ message: "GitHub must be a valid URL" }),
	status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED"], {
		message: "Invalid status",
	}),
});
type ProjectFormValues = z.infer<typeof projectSchema>;
export default function AddProject() {
	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			title: "",
			description: "",
			year: "",
			tech: "",
			image: [],
			demo: "",
			github: "",
			status: "PLANNED",
		},
	});
	const onSubmit = async (data: ProjectFormValues) => {
		try {
			// 👇 here you can call your API (e.g. POST /api/projects)
			console.log("✅ Project saved:", data);
			form.reset();
		} catch (error) {
			console.error("❌ Failed to save project:", error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add Project</Button>
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
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image URL</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											multiple
											onChange={(e) => {
												const files = e.target.files;
												if (files) {
													// Convert FileList → Array<File>
													field.onChange(Array.from(files));
												}
											}}
										/>
									</FormControl>
									<FormMessage />
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
						<Button type="submit" className="w-full">
							Save Project
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
