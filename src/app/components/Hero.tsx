"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "@/assets/hero-image-1.png";

const Hero = () => {
	return (
		<div className="relative overflow-clip min-h-screen text-white bg-[linear-gradient(to_bottom,#000_0%,#340F41_35%,#8A3DA4_55%,#B993ED_85%)]">
			<div className="absolute bg-black w-[2400px] h-[1000px] rounded-[50%] -translate-x-1/2 left-1/2 bg-[radial-gradient(closest-side,#000_85%,#9E4AC5)] top-[450px] border-1px border-[#fff]/30 " />
			<div className="container mx-auto relative z-10">
				<div className="flex flex-col items-center justify-center text-center  z-10">
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, y: 1 }}
						transition={{ duration: 0.8 }}
						className="relative mb-8 mt-24"
					>
						<div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 to-transparent rounded-full blur-3xl"></div>
						<Image
							src={heroImage}
							alt="profile photo"
							className="w-[240px] relative z-10 "
						/>
					</motion.div>
					<motion.div>
						<h1 className="text-4xl sm:text-5xl font-bold mb-4">
							Hi, I am <br />
							Presh <span className="text-purple-300">Akintobi</span>
						</h1>
						<p
							className="h1 text-xl text-white/80 max-w-lg mx-auto leading-relaxed mb-6
"
						>
							I am a fullStack developer specializing in building exceptional
							digital experiences. Currently, I am focused on building
							responsive full-stack web applications.
						</p>
						<div className="flex gap-6 justify-center">
							<motion.button
								whileHover={{
									scale: 1.1,
									textShadow: "0px 0px 8px rgb(255,255,255)",
									boxShadow: "0px 0px 8px rgb(255,255,255)",
								}}
								className="px-6 py-3 font-bold bg-gradient-to-r from-purple-700/80 to-purple-400 transition-colors hover:bg-purple-700 rounded-full"
							>
								Contact Me
							</motion.button>

							<motion.button
								whileHover={{
									scale: 1.1,
								}}
								className="px-6 py-3 border-white/20  transition-colors font-medium hover:bg-gray-700 rounded-full"
							>
								View Work
							</motion.button>
						</div>
					</motion.div>
				</div>
				<motion.div></motion.div>
			</div>
		</div>
	);
};

export default Hero;
