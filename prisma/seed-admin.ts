import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
	const email = "admin@example.com"; // <-- your admin email
	const newPassword = "admin1234"; // <-- password you want

	// Hash the password
	const hashedPassword = await bcrypt.hash(newPassword, 10);

	// Upsert the admin
	const admin = await prisma.admin.upsert({
		where: { email },
		update: { password: hashedPassword },
		create: {
			email,
			password: hashedPassword,
			// add other required fields if your admin table has them
		},
	});

	console.log("Admin seeded:", admin.email);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => process.exit());
