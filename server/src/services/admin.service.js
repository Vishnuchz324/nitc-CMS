import { prisma } from "./database.service.js";
import profileService from "./profile.service.js";
import reviewerService from "./reviewer.service.js";

const createReviewer = async (userId, profileId) => {
	try {
		const existingReviewer = await reviewerService.getReviewerUser(userId);
		if (!existingReviewer) {
			const reviewer = reviewerService.createReviewer(userId);
			await profileService.updateProfileRole(profileId, "REVIEWER");
			return reviewer;
		} else return existingReviewer;
	} catch (err) {
		throw err;
	}
};

export default {
	createReviewer,
};
