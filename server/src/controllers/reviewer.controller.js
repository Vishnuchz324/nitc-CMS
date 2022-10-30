import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";
import reviewerService from "../services/reviewer.service.js";

const getReviewer = async (req, res) => {
	try {
		const reviewerId = parseInt(req.params.reviewerId);
		const reviewer = await reviewerService.getReviewerById(reviewerId);
		if (!reviewer) {
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.INVALID_USER });
		} else res.status(HttpStatusCodes.OK).send(reviewer);
	} catch (err) {
		console.log(err);
	}
};

export default {
	getReviewer,
};
