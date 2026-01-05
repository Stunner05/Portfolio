import { v2 as cloudinary } from "cloudinary";
cloudinary.config();
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	console.log("This was hit");
	try {
		const formData = await req.formData();
		const files = formData.getAll("files") as File[];
		if (!files.length) {
			return NextResponse.json({
				message: "No files uploaded",
			});
		}
		const urls: string[] = [];
		for (const file of files) {
			const buffer = Buffer.from(await file.arrayBuffer());
			const result = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: "portfolio_projects" }, (err, res) => {
						if (err) reject(err);
						else resolve(res);
					})
					.end(buffer);
			});
			urls.push((result as any).secure_url);
		}
		return NextResponse.json({
			urls,
		});
	} catch (error) {
		console.log("error , something wen wrong", error);
		return NextResponse.json(
			{
				error: "upload failed",
			},
			{ status: 500 }
		);
	}
}
