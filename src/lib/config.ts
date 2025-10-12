import path from "path";

const isDev = process.env.NODE_ENV === "development";
export const API_URL =
	process.env.NEXTAUTH_URL ?? isDev
		? "http://localhost:3000"
		: "https://officialpreshportfolio.vercel.app";


export const getApiUrl = (path:string) => `${API_URL}${path}`