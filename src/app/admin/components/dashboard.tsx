"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, PenLine, User } from "lucide-react";
import AddProject from "./projectForm";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
export default function Dashboard() {
	return (
		<div className="p-6 space-y-6">
			{/* Top Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className=" bg-black">
					<CardHeader>
						<CardTitle className="text-gray-300">Projects</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-gray-300">12</p>
					</CardContent>
				</Card>

				<Card className="bg-black">
					<CardHeader>
						<CardTitle className="text-gray-300 ">Blog Posts</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">5</p>
					</CardContent>
				</Card>

				<Card className="bg-black">
					<CardHeader>
						<CardTitle>Messages</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">8</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Projects + Recent Blog Posts */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card className="bg-black">
					<CardHeader>
						<CardTitle>Recent Projects</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							<li>🚀 Portfolio Website – Sept 2025</li>
							<li>🎨 Design System – Aug 2025</li>
							<li>💻 Admin Dashboard – Aug 2025</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-black">
					<CardHeader>
						<CardTitle>Recent Blog Posts</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							<li>📖 “How I built my portfolio” – Sept 20, 2025</li>
							<li>📖 “React vs Next.js” – Aug 15, 2025</li>
							<li>📖 “Learning Shadcn UI” – Aug 01, 2025</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			{/* Messages + Quick Actions */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card className="bg-black">
					<CardHeader>
						<CardTitle>Recent Messages</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							<li>📩 John Doe – “Loved your portfolio!”</li>
							<li>📩 Jane Smith – “Interested in working with you.”</li>
							<li>📩 Mark Lee – “Can we connect on a project?”</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-black">
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent className="flex gap-2">
						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<Plus className="h-4 w-4 mr-2" /> Add Project
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[600px]">
								<DialogHeader>
									<DialogTitle>Add a New Project</DialogTitle>
								</DialogHeader>
								<AddProject />
							</DialogContent>
						</Dialog>
						<Button>
							<PenLine className="h-4 w-4 mr-2" /> New Blog
						</Button>
						<Button>
							<User className="h-4 w-4 mr-2" /> Edit Profile
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
