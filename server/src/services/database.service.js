import { PrismaClient } from "@prisma/client";

let prisma;
/**
 * Rerusn the global database instance if exists else create sa new database connection
 */
if (!global.prisma) {
	global.prisma = new PrismaClient();
}
prisma = global.prisma;

export { prisma };
