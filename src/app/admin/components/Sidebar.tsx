import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
	FaHome,
	FaProjectDiagram,
	FaFileAlt,
	FaUser,
	FaEnvelope,
	FaCog,
} from "react-icons/fa";
const groups = [
	{
		label: "Main",
		items: [{ title: "Dashboard", url: "/admin", icon: FaHome }],
	},
	{
		label: "Content",
		items: [
			{ title: "Projects", url: "/admin/projects", icon: FaProjectDiagram },
			{ title: "Blog Posts", url: "/admin/blog", icon: FaFileAlt },
			{ title: "About Me", url: "/admin/about", icon: FaUser },
		],
	},
	{
		label: "Messages",
		items: [
			{ title: "Contact Messages", url: "/admin/messages", icon: FaEnvelope },
		],
	},
	{
		label: "Settings",
		items: [
			{ title: "Profile & Socials", url: "/admin/settings", icon: FaCog },
		],
	},
];

const AppSidebar = () => {
	return (
		<Sidebar className="bg-black">
			<div className="px-4 py-2 border-b">
				<h1 className="text-lg font-bold">Portfolio Admin</h1>
			</div>
			<SidebarContent>
				{groups.map((group) => (
					<SidebarGroup key={group.label}>
						<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
						<SidebarGroupContent>
							{group.items.map((item) => {
								const Icon = item.icon;
								return (
									<a
										key={item.title}
										href={item.url}
										className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 text-sm"
									>
										<Icon className="h-4 w-4" />
										<span>{item.title}</span>
									</a>
								);
							})}
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<p className="text-xs text-muted-foreground px-3 py-2">
					© 2025 OfficialPresh
				</p>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
