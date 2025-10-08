"use client";

import { useEffect } from "react";
import axios from "axios";

const PageTracker = ({ page }: { page: string }) => {
	useEffect(() => {
		if (!page) return;
		axios
			.post("/api/track", { page })
			.then(() => {
				console.log(`Page "${page}" tracked successfully`);
			})
			.catch((err) => {
				console.error("Tracking failed:", err);
			});
	}, [page]);
	return null;
};

export default PageTracker;
