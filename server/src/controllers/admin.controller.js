import adminService from "../services/admin.service.js";
import userService from "../services/user.service.js";

import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";
import reviewerService from "../services/reviewer.service.js";

const createReviewer = async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);
		const user = await userService.getUserById(userId);
		if (!user)
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.INVALID_USER });
		else {
			const reviewer = await adminService.createReviewer(
				user.id,
				user.profileId
			);
			res.status(HttpStatusCodes.CREATED).send(reviewer);
		}
	} catch (err) {
		console.log(err);
	}
};

const getAllReviewers = async (req, res) => {
	try {
		const reviewers = await reviewerService.getAllReviewers();
		res.status(HttpStatusCodes.OK).send(reviewers);
	} catch (err) {
		console.log(err);
	}
};

export default {
	createReviewer,
	getAllReviewers,
};
