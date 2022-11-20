import { prisma } from "./database.service.js";
import { ROLES } from "./enums/auth.enum.js";
import profileService from "./profile.service.js";

/**
 * Returns the user with the given id
 */
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

/**
 * Returns all the users
 */
const getAllUsers = async () => {
	try {
		let users = await prisma.user.findMany({
			select: {
				id: true,
				department: true,
				rollNo: true,
				profile: {
					select: {
						name: true,
						email: true,
						role: true,
					},
				},
			},
		});

		users = users.map((user) => {
			let profile = user.profile;
			delete user.profile;
			return { ...user, ...profile };
		});
		return users;
	} catch (err) {
		throw err;
	}
};

/**
 * Creates a user
 */
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
export default { getUserById, createUser, getAllUsers };
