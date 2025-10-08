"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const res = await axios.post("/api/admin/login", { email, password });
			console.log(res);
			if (res.status === 200) {
				toast.success("Logged in successfully!");
				window.location.href = "/admin";
			}
		} catch (err: any) {
			setError("Invalid credentials");
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen bg-black text-white flex items-center justify-center">
			<form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-xl w-96">
				<h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full mb-3 p-2 rounded bg-gray-800"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full mb-3 p-2 rounded bg-gray-800"
				/>
				{error && <p className="text-red-500 mb-3">{error}</p>}
				<button className="bg-purple-700 w-full py-2 rounded hover:bg-purple-800">
					Login
				</button>
			</form>
		</div>
	);
}
