import { prisma } from "./database.service.js";
import profileService from "./profile.service.js";
import reviewerService from "./reviewer.service.js";

/**
 * Returns the admin with the given id
 */
const getAdminById = async (adminId) => {
	try {
		let admin = await prisma.admin.findUnique({
			where: {
				id: adminId,
			},
		});
		return admin;
	} catch (err) {
		throw err;
	}
};

/**
 * Returns all the admins
 */
const getAllAdmins = async () => {
	try {
		let admins = await prisma.admin.findMany({
			select: {
				id: true,
				designation: true,
			},
		});
		return admins;
	} catch (err) {
		throw err;
	}
};

/**
 * Creates a reviewer
 */
const createReviewer = async (userId, profileId) => {
	try {
		await profileService.updateProfileRole(profileId, "REVIEWER");
		const reviewer = reviewerService.createReviewer(userId);
		return reviewer;
	} catch (err) {
		throw err;
	}
};

export default {
	getAdminById,
	getAllAdmins,
	createReviewer,
};
