import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "../lib/keepAlive";
import mainIcon from "@/assets/global-network.png";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	preload: true,
});

export const metadata: Metadata = {
	title: "Akintobis Portfolio",
	description: "Portfolio website of OfficialPresh",
	icons: {
		icon: mainIcon.src, // This sets your favicon
	},
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={dmSans.className}>
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
			</body>
		</html>
	);
}
