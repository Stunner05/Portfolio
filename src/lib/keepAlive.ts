// lib/dbKeepAlive.ts
import prisma from "./prisma";

function keepAlive() {
	prisma.$queryRaw`SELECT 1`;
}

// run every 5 minutes
setInterval(keepAlive, 300_000);

console.log("Database keep-alive started");
