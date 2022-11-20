import adminService from "../services/admin.service.js";
import { COMPLAINT_STATUS } from "../services/enums/complaint.enum.js";
import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";
import reviewerService from "../services/reviewer.service.js";
import complaintService from "../services/complaints.service.js";
import validateService from "../services/validate.service.js";

/**
 * Get a reviewer by id
 * @returns reviewer
 */
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

/**
 * Get all the reviewers
 * @returns collection of reviewers
 */
const getAllReviewers = async (req, res) => {
	try {
		const reviewers = await reviewerService.getAllReviewers();
		res.status(HttpStatusCodes.OK).send(reviewers);
	} catch (err) {
		console.log(err);
	}
};

/**
 * Validate complaint
 * @returns validated complaint
 */
const validateComplaint = async (req, res) => {
	try {
		const reviewerId = parseInt(req.user.id);
		const complaintId = parseInt(req.params.complaintId);
		const adminId = parseInt(req.body.assignedTo);
		const remarks = req.body.remarks || "";

		const reviewer = await reviewerService.getReviewerById(reviewerId);
		const complaint = await complaintService.getComplaintById(complaintId);
		const admin = await adminService.getAdminById(adminId);

		// checks if reviewer is valid
		if (!reviewer)
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.INVALID_USER });
		// checks if complaint is valid
		else if (!complaint)
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.INVALID_COMPLAINT });
		// checks if admin is valid
		else if (!admin)
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.INVALID_ADMIN });
		else {
			// checks if the complaint is validated
			let validated = await validateService.isValidated(complaintId);
			if (!validated)
				// validate the complaint
				validated = await validateService.validateComplaint(
					complaintId,
					adminId,
					reviewerId,
					remarks
				);
			res.status(HttpStatusCodes.OK).send(validated);
		}
	} catch (err) {
		console.log(err);
	}
};

export default {
	getReviewer,
	getAllReviewers,
	validateComplaint,
};
