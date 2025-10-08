"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ContactForm = () => {
	const [form, setForm] = useState({
		email: "",
		subject: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post("/api/contact", {
				name: form.subject, // match backend field
				email: form.email,
				message: form.message,
			});

			if (res.status === 200) {
				toast.success("Message sent successfully!");
				setForm({ email: "", subject: "", message: "" });
			} else {
				toast.error(`${res.data?.error || "Failed to send message."}`);
			}
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong. Try again later.");
		} finally {
			setLoading(false);
		}

	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-6 px-10"
		>
			<div className="w-full md:w-[48%] space-y-6">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-300 mb-2"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						value={form.email}
						onChange={handleChange}
						placeholder="your@email.com"
						required
						className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-white"
					/>
				</div>

				<div>
					<label
						htmlFor="subject"
						className="block text-sm font-medium text-gray-300 mb-2"
					>
						Subject
					</label>
					<input
						type="text"
						id="subject"
						value={form.subject}
						onChange={handleChange}
						placeholder="What is this about?"
						required
						className="w-full text-white px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
					/>
				</div>
			</div>

			{/* Right side / message */}
			<div className="w-full md:w-[48%]">
				<label
					htmlFor="message"
					className="block text-sm font-medium text-gray-300 mb-2"
				>
					Message
				</label>
				<textarea
					id="message"
					value={form.message}
					onChange={handleChange}
					rows={8}
					required
					placeholder="Your message here"
					className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-white"
				/>
			</div>

			{/* Submit button */}
			<div className="w-full mt-4 md:mt-6">
				<button
					type="submit"
					disabled={loading}
					className={`px-6 py-3 font-bold rounded-lg transition-colors ${
						loading
							? "bg-gray-600 cursor-not-allowed"
							: "bg-purple-700 hover:bg-purple-600 text-white"
					}`}
				>
					{loading ? "Sending..." : "Send Message"}
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
