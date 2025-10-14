"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";


interface ImageUploaderProps {
	onUploadComplete?: (urls: string[]) => void;
	initialImages?: string[];
}

const ImageUploader = ({
	onUploadComplete,
	initialImages,
}: ImageUploaderProps) => {
	useEffect(() => {
		if (initialImages && initialImages.length > 0 && previews.length === 0) {
			setPreview(initialImages);
		}
	}, [initialImages]);

	const [previews, setPreview] = useState<string[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const [uploading, setUploading] = useState<boolean>(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files ? Array.from(e.target.files) : [];
		if (files.length === 0) return;

		const newPreviews = files.map((file) => URL.createObjectURL(file));
		setSelectedFiles((prev) => [...prev, ...files]);
		setPreview((prev) => [...prev, ...newPreviews]);
	};

	const handleFileUpload = async () => {
		if (selectedFiles.length === 0) return;
		setUploading(true);
		const formData = new FormData();
		selectedFiles.forEach((file) => formData.append("files", file));
		try {
			const res = await axios.post("/api/admin/upload", formData);
			if (res.status) {
				console.log("successfully uplaoaded images");
				const returnedUrls: string[] = res.data?.urls ?? previews;
				console.log("🚀 ~ handleFileUpload ~ returnedUrls:", returnedUrls);
				if (onUploadComplete) onUploadComplete(returnedUrls);
				toast.success("project updated successfully");

				setPreview(returnedUrls);
				setSelectedFiles([]);
			}
		} catch (error) {
			console.log("something went wrong ", error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<div className="mb-4 w-20 h-20 rounded-full flex justify-center items-center">
				<input
					placeholder="Choose image"
					type="file"
					multiple
					onChange={handleFileChange}
					className=" bg-purple-600 w-full h-full rounded-full cursor-pointer"
				/>
			</div>
			<div className="flex flex-row  gap-2">
				{previews.map((preview, i) => (
					<div key={i} className="relative">
						<Image
							src={preview}
							alt={`image preivew ${preview}`}
							className="rounded-md object-cover  h-28"
							width={100}
							height={20}
						/>
					</div>
				))}
				<button
					type="button"
					onClick={handleFileUpload}
					disabled={uploading}
					className="bg-purple-600 text-white px-2 py-1 rounded cursor-pointer h-20"
				>
					{uploading ? "Uploading..." : "Upload Images"}
				</button>
			</div>
		</div>
	);
};

export default ImageUploader;
