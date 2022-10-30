import { prisma } from "./database.service.js";
import profileService from "./profile.service.js";

/**
 * Gets a user from email
 * @param {object} - loginData containing the email and password
 * @returns {object} - the user and profile data
 */
const getUser = async (loginData) => {
	try {
		let profile = await profileService.getProfileFromData(loginData);
		let user = profile.user;
		return user;
	} catch (err) {
		throw err;
	}
};

const getUserById = async (userId) => {
	try {
		let user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		return user;
	} catch (err) {
		throw err;
	}
};

const createUser = async (profileData) => {
	try {
		const user = await prisma.user.create({
			data: {
				department: profileData.department,
				rollNo: profileData.rollNo,
				profile: {
					create: {
						name: profileData.name,
						password: profileData.password,
						email: profileData.email,
						contact: profileData.contact,
						role: ROLES.USER,
					},
				},
			},
		});
		return user;
	} catch (err) {
		throw err;
	}
};
export default { getUser, getUserById, createUser };
