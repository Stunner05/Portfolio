'use client'
import React from "react";
import { motion } from "framer-motion";

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
								href="mailto:yourname@email.com"
								className="text-xl text-purple-300"
							>
								yourname@email.com
							</a>
						</div>
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
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.303634490769!2d4.885084576287634!3d52.36602497978744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609d5b8c6e2bb%3A0x8e8b4e4f4e4f4e4f!2sKeizersgracht%20520%2C%201017%20EK%20Amsterdam%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1701301234567!5m2!1sen!2sus"
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
					></iframe>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Contact;
