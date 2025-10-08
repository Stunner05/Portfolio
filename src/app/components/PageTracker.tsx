"use client"

import React, { useEffect } from "react";
import axios from "axios";
const PageTracker = ({ page }: { page: string }) => {
	useEffect(() => {
		fetch("/api/track", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ page }),
		});
	}, [page]);
	return null;
};

export default PageTracker;
