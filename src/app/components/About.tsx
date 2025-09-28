import React from "react";
import Image from "next/image";
import project1 from "@/assets/AboutImages/image1.jpg";
import project2 from "@/assets/AboutImages/image2.jpg";
import project3 from "@/assets/AboutImages/image3.jpg";
import project4 from "@/assets/AboutImages/image4.jpg";
import project5 from "@/assets/AboutImages/image5.png";
import project6 from "@/assets/AboutImages/image6.png";
import { Progress } from "@/components/ui/progress";

const About = () => {
	return (
		<section id="about" className="p-10 text-white">
			<h2 className="text-3xl font-bold mb-6">
				About <span className="text-gray-600">Me</span>
			</h2>

			<div className="grid  md:grid-cols-3 gap-8">
				{/* Background */}
				<div className="rounded-lg p-6 mb-4 border border-white/20">
					<h3 className="text-xl font-semibold mb-2">01. Background</h3>
					<p className="text-white/70 mb-4">
						I am a passionate full stack Developer
					</p>
					<div className="rounded-lg p-6 mb-4 border border-white/20 bg-black/30">
						<code>
							const skills = [<br /> 'javascript', 'react', 'nodejs',
							'typescript', 'PostgreSQL' 'python', 'django', 'html', 'css', 'tailwindcss',
							'git', 'github',
							<br />
							];
						</code>
					</div>
				</div>

				<div className="border border-white/20 rounded-lg p-6">
					<h3 className="text-2xl font-bold mb-2">02. Specialization</h3>
					<p className="text-white/50">
						I specialize in building web applications using modern technologies
						like React and Node.js. I have a strong foundation in both front-end
						and back-end development, allowing me to create seamless and
						efficient user experiences.
					</p>
					<div className="mt-4 relative border border-white/20 w-full overflow-hidden rounded-lg h-[220px]">
						<Image
							src={project3}
							alt="Coding Illustration"
							fill
							className="rounded-lg object-cover"
						/>
					</div>
				</div>

				{/* Skills */}
				<div className="grid text-center gap-4">
					<div className="border border-white/20 rounded-lg p-6">
						<h3 className="text-2xl font-bold mb-2">03 Skills</h3>
						<h4 className="text-purple-300 font-medium mb-3">Frontend</h4>
						<ul className="text-white/70 space-y-2">
							<li>React</li>
							<li>Typescript</li>
							<li>Tailwind CSS</li>
							<li>Framer Motion</li>
						</ul>
					</div>

					<div className="border border-white/20 rounded-lg p-3">
						<h3 className="text-2xl font-bold mb-2"> Backend</h3>
						<h4 className="text-purple-300 font-medium mb-3">Backend</h4>

						<ul className="text-white/70 space-y-2 text-sm">
							<li>Node.js</li>
							<li>Python</li>
							<li>PostgreSQL</li>
						</ul>
					</div>
				</div>

				<div className="col-span-3 grid md:grid-cols-2 gap-4">
					<div className="border border-white/20 rounded-lg p-6 ">
						<div className="border border-white/20 rounded-lg p-6 ">
							<div className="space-y-5">
								<div>
									<label htmlFor="" className="block text-sm font-medium mb-1">
										Front-end
									</label>
									<Progress
										value={90}
										className="bg-gray-300/20 [&>div]:bg-gray-100/80"
									/>
								</div>
								<div>
									<label htmlFor="" className="block text-sm font-medium mb-1">
										Back-end
									</label>
									<Progress
										value={80}
										className="bg-gray-300/20 [&>div]:bg-gray-100/80"
									/>
								</div>
								<div>
									<label htmlFor="" className="block text-sm font-medium mb-1">
										Front-end
									</label>
									<Progress
										value={70}
										className="bg-gray-300/20 [&>div]:bg-gray-100/80"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="border border-white/20 rounded-lg p-6 ">
						<div className="relative border border-white/20 overflow-hidden p-4  h-[220px]">
							<Image
								src={project5}
								alt="project 2"
								fill
								objectFit="cover"
								className="rounded-lg"
							/>
						</div>
						<div className="">
							<h3 className="text-2xl font-bold mb-6">05. Goals</h3>
							<p className="text-white/50 ">
								My goal is to continuously improve my skills and stay updated
								with the latest industry trends. I am eager to take on
								challenging projects that allow me to grow as a developer and
								contribute to meaningful software solutions.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
