import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Search, Moon } from "lucide-react";

export default function Header() {
	return (
		<div className="flex items-center w-full  justify-between p-4 border-b  text-white ">
			{/* Search */}
			<div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md">
				<Search className="h-4 w-4 text-gray-400" />
				<Input
					type="text"
					placeholder="Search..."
					className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-400"
				/>
			</div>

			{/* Icons */}
			<div className="flex items-center gap-3">
				<Button variant="ghost" size="icon">
					<Moon className="h-5 w-5" />
				</Button>
				<Button variant="ghost" size="icon">
					<Bell className="h-5 w-5" />
				</Button>
				<Button variant="ghost" size="icon">
					<Settings className="h-5 w-5" />
				</Button>
				<Button variant="ghost" size="icon">
					<User className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}
