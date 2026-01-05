import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Your user validation logic
				if (
					credentials?.email === "admin@test.com" &&
					credentials?.password === "1234"
				) {
					return {
						id: "1",
						name: "Admin",
						email: "admin@test.com",
						role: "ADMIN",
					};
				}
				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, config);
}
