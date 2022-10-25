import { PrismaClient } from "@prisma/client";

/**
 * Checks wheather the email is registered
 * @param {string} email - the email to be searched
 * @returns  {boolean}
 */
const isEmailExists = async (email) => {
	const prisma = new PrismaClient();
	try {
		let profile = await prisma.profile.findFirst({
			where: {
				email: email,
			},
		});
		if (profile) return true;
		else false;
	} catch (err) {
		throw err;
	}
};

/**
 * Checks wheather the contact is registered
 * @param {string} contact - the contact to be searched
 * @returns  {boolean}
 */
const isContactExists = async (contact) => {
	const prisma = new PrismaClient();
	try {
		let profile = await prisma.profile.findFirst({
			where: {
				contact: contact,
			},
		});
		if (profile) return true;
		else false;
	} catch (err) {
		throw err;
	}
};

export { isContactExists, isEmailExists };
