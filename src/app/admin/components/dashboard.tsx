import { getDashboardData } from "../actions/projects/routes";
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

export default async function Dashboard() {
	const { projectsCount, messagesCount, recentProjects, recentMessages } =
		await getDashboardData();

	return (
		<div className="p-6 space-y-6">
			{/* Top Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className="bg-black">
					<CardHeader>
						<CardTitle className="text-gray-300">Projects</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-gray-300">{projectsCount}</p>
					</CardContent>
				</Card>

				<Card className="bg-black">
					<CardHeader>
						<CardTitle className="text-gray-300">Blog Posts</CardTitle>
					</CardHeader>
				</Card>

				<Card className="bg-black">
					<CardHeader>
						<CardTitle className="text-gray-300">Messages</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-gray-300">{messagesCount}</p>
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
							{recentProjects.map((p) => (
								<li key={p.id}>🚀 {p.title}</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card className="bg-black">
					<CardHeader>
						<CardTitle>Recent Messages</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{recentMessages.map((m) => (
								<li key={m.id}>
									📩 {m.name} – “{m.content.slice(0, 30)}...”
									{m.email}
								</li>
							))}
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
									<Plus className="h-4 w-4 mr-2 cursor-pointer" /> Add Project
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[600px]">
								<DialogHeader>
									<DialogTitle className="">
										<button className="cursor-pointer">
											Add a New Project
										</button>
									</DialogTitle>
								</DialogHeader>
								<AddProject />
							</DialogContent>
						</Dialog>
						<Button>
							<PenLine className="h-4 w-4 mr-2 cursor-pointer" /> New Blog
						</Button>
						<Button>
							<User className="h-4 w-4 mr-2 cursor-pointer" /> Edit Profile
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
