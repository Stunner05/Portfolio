import prisma from "../src/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { Status } from "@/generated/prisma/client";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __fileName = fileURLToPath(import.meta.url);
const __dir = path.dirname(__fileName);
cloudinary.config();
type ProjectData = {
	title: string;
	description: string;
	year: number;
	tech: string[];
	image: string[];
	demo: string;
	github: string;
	status: Status;
};

// async function uploadOnce(localPath: string, publicId: string) {
// 	try {
// 		const imageExists = await cloudinary.api
// 			.resource(publicId)
// 			.catch(() => null);
// 		if (imageExists) {
// 			console.log(`skippiing upload -${publicId}`, publicId)
// 			return imageExists.secure_url
// 		}

// 		const result = await cloudinary.api.upload
// 	} catch (error) {}
// }

async function main() {
	const hashPassword = await bcrypt.hash("portfolioAdmin", 10);
	await prisma.admin.upsert({
		where: { email: "aipresh05@gmail.com" },
		update: {},
		create: { email: "aipresh05@gmail.com", password: hashPassword },
	});
	await prisma.project.deleteMany();

	const uploads = await Promise.all([
		cloudinary.uploader.upload(
			path.resolve(__dirname, "../src/assets/ProjectImages/Expensetracker2.png")
		),
		cloudinary.uploader.upload(
			path.resolve(__dirname, "../src/assets/ProjectImages/image1.png")
		),
	]);
	const foodImages = await Promise.all([
		cloudinary.uploader.upload(
			path.resolve(__dirname, "../src/assets/ProjectImages/foodimage1.png")
		),
	]);
	const cryptoImages = await Promise.all([
		cloudinary.uploader.upload(
			path.resolve(__dirname, "../src/assets/ProjectImages/image2.png")
		),
	]);
	const EcomImages = await Promise.all([
		cloudinary.uploader.upload(
			path.resolve(__dirname, "../src/assets/ProjectImages/Ecommerce1.png")
		),
	]);

	const projects: ProjectData[] = [
		{
			title: "Expense Tracker",
			description:
				"An expense tracker app to manage and keep track of your finances.",
			year: 2025,
			tech: ["React", "Next.js", "TailwindCSS", "MongoDB", "Express"],
			image: uploads.map((u) => u.secure_url),
			demo: "https://moneyflowtracker.netlify.app/",
			github: "https://github.com/Stunner05/EXPENSE-TRACKER.git",
			status: Status.COMPLETED,
		},
		{
			title: "Food Delivery App",
			description:
				"A food delivery app to order food from your favorite restaurants.",
			year: 2025,
			tech: ["Next.js", "Expo", "postgressql", "TailwindCSS"],
			image: foodImages.map((u) => u.secure_url),
			demo: "#",
			github: "#",
			status: Status.PLANNED,
		},
		{
			title: "Crypto App",
			description: "A crypto app to buy and sell cryptocurrencies.",
			year: 2024,
			tech: ["React Native", "Expo", "TypeScript", "TailwindCSS"],
			image: cryptoImages.map((img) => img.secure_url),
			demo: "#",
			github: "https://github.com/Stunner05/crypto_app",
			status: Status.IN_PROGRESS,
		},
		{
			title: "E-commerce Website",
			description: "An e-commerce website to buy and sell products online.",
			year: 2025,
			tech: ["Next.js", "Node.js", "MongoDB"],
			image: EcomImages.map((img) => img.secure_url),
			demo: "#",
			github: "https://github.com/Stunner05/E-commerce-App",
			status: Status.IN_PROGRESS,
		},
	];

	for (const project of projects) {
		await prisma.project.upsert({
			where: { github: project.github },
			update: project, // optional: you can set to {} if you don't want it to update
			create: project,
		});
	}
	console.log("Created seeded projects");
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
