import { prisma } from "./database.service.js";

/**
 * Checks wheather the email is registered
 * @param {string} email - the email to be searched
 * @returns  {boolean}
 */
const isEmailExists = async (email) => {
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

const updateProfileRole = async (profileId, role) => {
	console.log(profileId, role);
	try {
		let profile = await prisma.profile.update({
			where: {
				id: profileId,
			},
			data: {
				role: role,
			},
		});

		return profile;
	} catch (err) {
		throw err;
	}
};

const getProfileFromData = async (loginData) => {
	let profile = await prisma.profile.findUnique({
		where: {
			email: loginData.email,
		},
		include: {
			User: true,
			Admin: true,
		},
	});
	return profile;
};

export default {
	isContactExists,
	isEmailExists,
	getProfileFromData,
	updateProfileRole,
};
