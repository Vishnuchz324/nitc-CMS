import { PrismaClient } from "@prisma/client";
import { prisma } from "./database.service.js";

/**
 * Gets a user from email
 * @param {object} - loginData containing the email and password
 * @returns {object} - the user and profile data
 */
const getUser = async (loginData) => {
	try {
		let user = await prisma.profile.findUnique({
			where: {
				email: loginData.email,
			},
			include: {
				User: true,
			},
		});
		return user;
	} catch (err) {
		throw err;
	}
};

export { getUser };
