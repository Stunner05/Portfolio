"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import project1 from "@/assets/ProjectImages/image1.png";
import project3 from "@/assets/AboutImages/image3.jpg";
import { Project } from "../../generated/prisma/index";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

type PortFolioProps = {
	projects: Project[];
};
const Portfolio = ({ projects }: PortFolioProps) => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		projects.length > 0 ? projects[0] : null
	);
	const [currentImage, setCurentImage] = useState(0);

	useEffect(() => {
		if (!selectedProject?.image?.length) return;
		const Interval = setInterval(() => {
			setCurentImage((prev) =>
				prev === selectedProject.image.length - 1 ? 0 : prev + 1
			);
		}, 3000);
		setCurentImage(0);
		return () => clearInterval(Interval);
	}, [selectedProject]);
	return (
		<section id="portfolio" className="py-32 bg-black text-white">
			<div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
				<div>
					<h2 className="text-5xl font-bold mb-10">
						Selected <span className="text-purple-300">Projects</span>
					</h2>
					<div className="space-y-8">
						{projects.map((project) => {
							return (
								<button
									key={project.id}
									onClick={() => setSelectedProject(project)}
									className="w-full text-left group focus:outline-none relative cursor-pointer"
									aria-selected={selectedProject?.id === project.id}
								>
									<h3
										className={clsx(
											"text-2xl font-semibold transition-colors duration-300",
											selectedProject?.id === project.id
												? "text-purple-300"
												: "group-hover:text-purple-500",
											(project.status === "IN_PROGRESS" ||
												project.status === "PLANNED") &&
												"opacity-50"
										)}
									>
										{project.title}
									</h3>
									{(project.status === "IN_PROGRESS" ||
										project.status === "PLANNED") && (
										<span className="absolute top-0 right-0 text-xs bg-purple-800 text-white px-2 py-1 rounded">
											Coming Soon
										</span>
									)}
									{selectedProject?.id === project.id && (
										<div className="mt-3">
											<div className="border-b-2 border-purple-300 my-4"></div>
											<p className="text-purple-400">{project.description}</p>
											<p className="text-sm text-gray-400 mt-2">
												Year: {project.year}
											</p>
											{/* Tech Stack */}
											<div className="flex flex-wrap gap-2 mt-3">
												{project.tech.map((t, i) => (
													<span
														key={i}
														className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
													>
														{t}
													</span>
												))}
											</div>
											{project.status === "COMPLETED" && (
												<div className="flex gap-6 mt-4">
													<a
														href={project.demo}
														target="_blank"
														rel="noopener noreferrer"
														className="text-purple-300 hover:underline"
													>
														Live Demo
													</a>
													<a
														href={project.github}
														target="_blank"
														rel="noopener noreferrer"
														className="text-purple-300 hover:underline"
													>
														GitHub
													</a>
												</div>
											)}
										</div>
									)}
								</button>
							);
						})}
					</div>
				</div>
				{/* Right: Selected Project Preview */}
				<div className="flex items-center justify-center relative">
					<div className="relative">
						<Image
							key={currentImage} // re-render when index changes
							src={selectedProject?.image?.[currentImage] ?? "/placeholder.png"}
							className={clsx(
								"rounded-xl shadow-lg transition-transform duration-500 ease-in-out hover:scale-105 animate-fadeIn ",
								selectedProject &&
									(selectedProject.status === "IN_PROGRESS" || selectedProject.status ==="PLANNED") &&
									"grayscale opacity-70"
							)}
							width={450}
							height={850}
							style={{
								objectFit: "cover",
								aspectRatio: "3 / 2", // You can tweak this
							}}
							alt={selectedProject?.title ?? "project title"}
						/>

						{(selectedProject?.status === "IN_PROGRESS" || selectedProject?.status === "PLANNED") && (
							<div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
								<span className="text-xl font-bold text-purple-300">
									🚧 Coming Soon
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Portfolio;
