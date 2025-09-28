"use client";

import { motion } from "framer-motion";
import fiver from "@/assets/logo/log1.png";
import elementor from "@/assets/logo/logo2.png";
import oracle from "@/assets/logo/logo3.jpg";
import Image from "next/image";
import logitech from "@/assets/logo/logo4.jpg";
import React from "react";

const LogoAnimation = () => {
	const images = [
		{ src: fiver, alt: "fiver" },
		{ src: elementor, alt: "elementor" },
		{ src: oracle, alt: "oracle" },
		{ src: logitech, alt: "logitech" },
		{ src: fiver, alt: "fiver" },
		{ src: elementor, alt: "elementor" },
		{ src: oracle, alt: "oracle" },
		{ src: logitech, alt: "logitech" },
		{ src: fiver, alt: "fiver" },
		{ src: elementor, alt: "elementor" },
		{ src: oracle, alt: "oracle" },
		{ src: logitech, alt: "logitech" },
		{ src: fiver, alt: "fiver" },
		{ src: elementor, alt: "elementor" },
		{ src: oracle, alt: "oracle" },
		{ src: logitech, alt: "logitech" },
		{ src: fiver, alt: "fiver" },
		{ src: elementor, alt: "elementor" },
		{ src: oracle, alt: "oracle" },
		{ src: logitech, alt: "logitech" },
	];
	return (
		<div className="py-8 my-24 skew-y-3 glass bg-purple-200/10 opacity-80">
			<div className="container mx-auto ">
				<div className=" [mask-image:linear-gradient(to_right,_transparent,_black_25%,_black_75%,_transparent)]">
					<motion.div
						className="flex gap-14 flex-none pr-14 "
						animate={{ translateX: "-50%" }}
						transition={{
							duration: 35,
							repeat: Infinity,
							ease: "linear",
							repeatType: "loop",
						}}
					>
						{images.map((img, index) => (
							<Image
								src={img.src}
								alt={img.alt}
								key={index}
								height={30}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default LogoAnimation;
