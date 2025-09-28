
'use client'
import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
	SiNodedotjs,
	SiMongodb,
	SiDocker,
	SiFramer,
	SiFigma,
	SiReact,
} from "react-icons/si";

const Stack = () => {
	const stackItems = [
		{
			id: 1,
			name: "Framer Motion",
			icon: <SiFramer />,
			color: "text-green-200",
		},
		{ id: 2, name: "Node.js", icon: <SiNodedotjs />, color: "text-green-200" },
		{ id: 3, name: "MongoDB", icon: <SiMongodb />, color: "text-green-200" },
		{ id: 4, name: "Docker", icon: <SiDocker />, color: "text-green-200" },
		{ id: 5, name: "Figma", icon: <SiFigma />, color: "text-green-200" },
		{ id: 6, name: "React", icon: <SiReact />, color: "text-green-200" },
	];

	const itemVariants = {
		hidden: (index: number) => ({
			opacity: 0,
			x: index % 2 === 0 ? -100 : 50,
		}),
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.5 },
		},
	};

	const controls = useAnimation();
  const ref = React.useRef(null);
	const inView = useInView(ref, { amount: 0.2 });

	React.useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	return (
		<section id="stack" >
			<div className="mx-auto text-center max-w-[250px]">
				<h2 className="text-7xl text-gray-200 font-bold mb-10">Tech Stack</h2>
				<div className="grid gap-8" ref={ref}>
					{stackItems.map((item, index) => (
						<motion.div
							key={item.id}
							custom={index}
							variants={itemVariants}
							initial="hidden"
							animate={controls}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="flex flex-row rounded-lg shadow-lg hover:shadow-2xl bg-white/20 items-center justify-center p-6"
						>
							<div className={`text-5xl ${item.color}`}>{item.icon}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Stack;
