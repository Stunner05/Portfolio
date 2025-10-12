export type Project = {
	title: string;
	description: string;
	year: number;
	tech: string[];
	demo: string;
	github: string;
	status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
	image: { url: string }[];
};



export type Nil<T> = T | null | undefined;

export type HTTPMethod =
	| "GET"
	| "HEAD"
	| "POST"
	| "PUT"
	| "DELETE"
	| "CONNECT"
	| "OPTIONS"
	| "TRACE"
	| "PATCH";
