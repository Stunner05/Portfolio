import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/app/admin/components/Sidebar";
import Header from "./components/Header";
import { ToastContainer, } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="bg-black flex min-h-screen dark">
			<AppSidebar />
			<SidebarTrigger />
			<main className=" flex-1 flex flex-col">
				<Header />
				{children}
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
			</main>
		</SidebarProvider>
	);
}
