import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { title } from "process";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Project } from "@/lib/types";

interface EditFormProps {
	project: Project;
}

const EditForm = ({ project }: EditFormProps) => {
	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<Project>({
		defaultValues: {
			title: project.title ?? "",
			demo: project.demo ?? "",
			tech: project.tech ?? [],
			description: project.description ?? "",
			image: project.image?.map((img) =>
				typeof img === "string" ? { url: img } : { url: (img as any).url ?? "" }
			) || [{ url: "" }],
			// image: project.image?.map((url) => ({ url  || [{ url: "" }])),
			github: project.github ?? "",
			status: project.status ?? undefined,
			year: project.year != null ? Number(project.year) : undefined,
		},
	});

	const {
		fields: imageFields,
		append: addImage,
		remove: deleteImage,
	} = useFieldArray<Project>({
		control,
		name: "image" as const,
	});

	const onSubmit: SubmitHandler<Project> = async (data) => {
		try {
			const res = await axios.put("api/admin/project/route");
			if (res.status) {
				toast.success("project updated successfully");
			}
		} catch (error) {
			toast.error("something went wrong");
			console.log("something went wrong", error);
		}
	};

	// const addImage = (val: string) => append(val);
	// const removeImage = (index: number) => remove(index);

	return (
		<>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 bg-gray-900 p-6 rounded-lg"
				>
					<div>
						<label className="block mb-1 text-sm text-gray-300">Title</label>
						<input
							{...register("title")}
							className="w-full bg-gray-800 p-2 rounded text-white"
							placeholder="Enter project title"
						/>
					</div>

					<div>
						<label className="block mb-1 text-sm text-gray-300">Year</label>
						<input
							type="number"
							{...register("year", { valueAsNumber: true })}
							className="w-full bg-gray-800 p-2 rounded text-white"
						/>
					</div>

					<div>
						//{" "}
						<label className="block mb-1 text-sm text-gray-300">
							Description
						</label>
						<textarea
							{...register("description")}
							className="w-full bg-gray-800 p-2 rounded text-white"
							rows={3}
							placeholder="Enter project description"
						/>
					</div>

					<div>
						<label className="block mb-1 text-sm text-gray-300">
							Tech Stack
						</label>
						<input
							{...register("tech")}
							className="w-full bg-gray-800 p-2 rounded text-white"
							placeholder="e.g. React, Next.js, Prisma"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block mb-1 text-sm text-gray-300">
								Demo Link
							</label>
							<input
								{...register("demo")}
								className="w-full bg-gray-800 p-2 rounded text-white"
							/>
						</div>
						<div>
							<label className="block mb-1 text-sm text-gray-300">
								GitHub Link
							</label>
							<input
								{...register("github")}
								className="w-full bg-gray-800 p-2 rounded text-white"
							/>
						</div>
					</div>

					<div>
						<label className="block mb-1 text-sm text-gray-300">Status</label>
						<select
							{...register("status")}
							className="w-full bg-gray-800 p-2 rounded text-white"
						>
							<option value="PLANNED">Planned</option>
							<option value="IN_PROGRESS">In Progress</option>
							<option value="COMPLETED">Completed</option>
						</select>
					</div>

					<div>
						<label className="block mb-2 text-sm text-gray-300">Images</label>
						{imageFields.map((field, index) => (
							<div key={field.id} className="flex gap-2 items-center">
								<input
									{...register(`image.${index}` as const)}
									className="flex-1 bg-gray-800 p-2 rounded text-white"
									placeholder="Image URL"
								/>
								<button
									type="button"
									onClick={() => deleteImage(index)}
									className="text-red-400 hover:text-red-600"
								>
									Remove
								</button>
							</div>
						))}
					</div>

					<div>
						<button
							type="button"
							onClick={() => addImage({url: ""})}
							className="mt-2 text-sm text-purple-400 hover:underline"
						>
							+ Add Image
						</button>

						<button
							type="submit"
							disabled={isSubmitting}
							className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
						>
							{isSubmitting ? "Updating..." : "Update Project"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditForm;
