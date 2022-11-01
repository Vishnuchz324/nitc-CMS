import { prisma } from "./database.service.js";
import profileService from "./profile.service.js";
import reviewerService from "./reviewer.service.js";

const createReviewer = async (userId, profileId) => {
	try {
		const existingReviewer = await reviewerService.getReviewerUser(userId);
		if (!existingReviewer) {
			const reviewer = reviewerService.createReviewer(userId);
			const profile = await profileService.updateProfileRole(
				profileId,
				"REVIEWER"
			);
			return reviewer;
		} else return existingReviewer;
	} catch (err) {
		throw err;
	}
};

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

const getAdminFromProfile = async (profileId) => {
	try {
		const admin = await prisma.admin.findUnique({
			where: {
				profileId: profileId,
			},
		});
	} catch (err) {
		throw err;
	}
};

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
export default {
	getAdminById,
	getAdminFromProfile,
	getAllAdmins,
	createReviewer,
};
