"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import ContactForm from "./ContactForm";

const Contact = () => {
	return (
		<section id="contact">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="grid lg:grid-cols-2 gap-16 py-32 bg-black text-white max-w-7xl mx-auto px-4 rounded-2xl"
			>
				{/* Left side */}
				<div className="space-y-12">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-4xl font-bold"
					>
						Get in <span className="text-gray-500">touch</span>
					</motion.h2>

					<div className="space-y-4">
						<div>
							<p className="text-gray-400">Phone</p>
							<a href="tel:+2347063993285" className="text-xl text-purple-300">
								+234 706 399 3285
							</a>
						</div>
						<div>
							<p className="text-gray-400">Email</p>
							<a
								href="mailto:Aipresh05@gmail.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-xl text-purple-300 hover:underline"
							>
								Aipresh05@gmail.com
							</a>
						</div>
					</div>

					{/* Social media links */}

					<div className="flex space-x-6 mt-8 text-3xl">
						{[
							{
								icon: <FaGithub />,
								link: "https://github.com/Stunner05",
								label: "GitHub",
							},
							{
								icon: <FaLinkedin />,
								link: "https://www.linkedin.com/in/dukeakintobi/",
								label: "LinkedIn",
							},
							{
								icon: <FaTwitter />,
								link: "https://x.com/OfficialPresh_V",
								label: "Twitter",
							},
							{
								icon: <FaInstagram />,
								link: "https://www.instagram.com/official1presh/",
								label: "Instagram",
							},
						].map((social, i) => (
							<motion.a
								key={i}
								href={social.link}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.2, color: "#a855f7" }} // purple hover
								whileTap={{ scale: 0.95 }}
								className="text-gray-400 transition-colors"
								aria-label={social.label}
							>
								{social.icon}
							</motion.a>
						))}
					</div>
				</div>

				{/* Right side: Map */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden"
				>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63303.93386196986!2d3.879899872951829!3d7.387899053681509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398dcd7da2dc1f%3A0x51dcf2a61b6f4ed2!2sIbadan%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1728309999999!5m2!1sen!2sng"
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
					/>
				</motion.div>
			</motion.div>

			<div>
				<ContactForm />
			</div>
		</section>
	);
};

export default Contact;
