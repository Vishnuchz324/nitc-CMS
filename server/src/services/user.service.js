import { PrismaClient } from "@prisma/client";

/**
 * Gets a user from email
 * @param {object} - loginData containing the email and password
 * @returns {object} - the user and profile data
 */
const getUser = async (loginData) => {
	const prisma = new PrismaClient();
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
