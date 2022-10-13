import logger from "./logger.service.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: "Alice",
			email: "alice@prisma.io",
		},
	});
	logger.info(`created new user ${user.name}`);
}

main();
