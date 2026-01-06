"use client";

import React from "react";
import Image from "next/image";
import project3 from "@/assets/AboutImages/image3.jpg";
import project5 from "@/assets/AboutImages/image5.png";
import { Progress } from "@/components/ui/progress";

const About = () => {
	return (
		<section id="about" className="p-10 text-white max-w-7xl mx-auto">
			<h2 className="text-3xl font-bold mb-8">
				About <span className="text-gray-500">Me</span>
			</h2>

			<div className="grid md:grid-cols-3 grid-cols-1 gap-10">
				{/* Background */}
				<div className="rounded-lg p-6 border border-white/20 bg-black/30">
					<h3 className="text-xl font-semibold mb-3">01. Background</h3>
					<p className="text-white/70 mb-4">
						{`I am a passionate Full Stack Developer.`}
					</p>

					<div className="rounded-lg p-4 border border-white/20 bg-black/40 overflow-x-auto">
						<code className="text-sm text-white/70 block">
							const skills = [<br />
							<span className="pl-4">
								javascript, <span className="text-blue-400">react</span>,
								nodejs,
							</span>
							<br />
							<span className="pl-4">
								<span className="text-yellow-300">typescript</span>, PostgreSQL,
								python, html, css,
							</span>
							<br />
							<span className="pl-4">
								<span className="text-teal-400">tailwindcss</span>, git, github,
							</span>
							<br />
							];
						</code>
					</div>
				</div>

				{/* Specialization */}
				<div className="border border-white/20 rounded-lg p-6">
					<h3 className="text-2xl font-bold mb-3">02. Specialization</h3>
					<p className="text-white/50 mb-4">
						{`I specialize in building web applications using modern technologies like React and Node.js. I have a strong foundation in both front-end and back-end development, allowing me to create seamless and efficient user experiences.`}
					</p>
					<div className="relative border border-white/20 rounded-lg overflow-hidden h-[220px]">
						<Image
							src={project3}
							alt="Coding Illustration"
							fill
							className="object-cover rounded-lg"
						/>
					</div>
				</div>

				{/* Skills */}
				<div className="grid gap-4 text-center">
					<div className="border border-white/20 rounded-lg p-6">
						<h3 className="text-2xl font-bold mb-2">03. Skills</h3>
						<h4 className="text-purple-300 font-medium mb-3">Frontend</h4>
						<ul className="text-white/70 space-y-2">
							<li>React</li>
							<li>Typescript</li>
							<li>Tailwind CSS</li>
							<li>Framer Motion</li>
						</ul>
					</div>

					<div className="border border-white/20 rounded-lg p-6">
						<h3 className="text-2xl font-bold mb-2">Backend</h3>
						<h4 className="text-purple-300 font-medium mb-3">Backend</h4>
						<ul className="text-white/70 space-y-2 text-sm">
							<li>Node.js</li>
							<li>Python</li>
							<li>PostgreSQL</li>
						</ul>
					</div>
				</div>

				{/* Approach & Goals */}
				<div className="col-span-3 grid md:grid-cols-2 gap-4 mt-4">
					<div className="border border-white/20 rounded-lg p-6">
						<h3 className="text-2xl font-bold mb-4">04. Approach</h3>
						<p className="text-white/50 mb-6">
							{`I combine creativity with strategy, turning ideas into practical, elegant solutions. My process emphasizes planning, execution, and iteration to deliver results that make an impact.`}
						</p>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1">
									Front-end
								</label>
								<Progress
									value={90}
									className="bg-gray-300/20  progress-bar-white  "
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1 ">
									Back-end
								</label>
								<Progress
									value={80}
									className="bg-gray-300/20 progress-bar-white   "
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">DevOps</label>
								<Progress
									value={85}
									className="bg-gray-300/20 progress-bar-white  "
									 indicatorClassName="bg-white"
								/>
							</div>
						</div>
					</div>

					<div className="border border-white/20 rounded-lg p-6">
						<h3 className="text-2xl font-bold mb-4">05. Goals</h3>
						<p className="text-white/50 mb-4">
							{`My goal is to continuously improve my skills and stay updated with the latest industry trends. I am eager to take on challenging projects that allow me to grow as a developer and contribute to meaningful software solutions.`}
						</p>

						<div className="relative border border-white/20 rounded-lg overflow-hidden h-[220px]">
							<Image
								src={project5}
								alt="Goal Illustration"
								fill
								className="object-cover rounded-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
