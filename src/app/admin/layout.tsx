import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/app/admin/components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="bg-black flex min-h-screen dark">
			<AppSidebar />
			<SidebarTrigger />
			<main className=" flex-1 flex flex-col">
				<Header />
				<Dashboard />
				{children}
			</main>
		</SidebarProvider>
	);
}
