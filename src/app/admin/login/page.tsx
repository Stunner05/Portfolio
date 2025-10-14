"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false); // 👈 loading state

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true); // 👈 start loading

		try {
			const res = await axios.post("/api/admin/login", { email, password });
			if (res.status === 200) {
				toast.success("Logged in successfully!");
				router.push("/admin");
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError("Invalid credentials: " + err.message);
			} else {
				setError("Invalid credentials");
			}
			console.error(err);
			setIsLoading(false); // 👈 stop loading on error
		}
	};

	if (isLoading) {
		// 👇 this acts like a Suspense fallback
		return (
			<div className="min-h-screen flex items-center justify-center bg-black text-white">
				<div className="animate-pulse text-lg">Logging you in...</div>
			</div>
		);
	}

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
				<button
					disabled={isLoading}
					className="bg-purple-700 w-full py-2 rounded hover:bg-purple-800 disabled:bg-purple-900"
				>
					{isLoading ? "Please wait..." : "Login"}
				</button>
			</form>
		</div>
	);
}
