import adminService from "../services/admin.service.js";
import userService from "../services/user.service.js";

import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";
import validateService from "../services/validate.service.js";
import reviewerService from "../services/reviewer.service.js";
import complaintService from "../services/complaints.service.js";
import workService from "../services/work.service.js";
import { COMPLAINT_STATUS } from "../services/enums/complaint.enum.js";
import profileService from "../services/profile.service.js";

/**
 * Get all the admins
 * @returns collection of admins
 */
const getAllAdmins = async (req, res) => {
	try {
		const admins = await adminService.getAllAdmins();
		res.status(HttpStatusCodes.OK).send(admins);
	} catch (err) {
		console.log(err);
	}
};

/**
 * Get all the users
 * @returns collection of users
 */
const getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers();
		res.status(HttpStatusCodes.OK).send(users);
	} catch (err) {
		console.log(err);
	}
};

/**
 * Get all complaints assigned to and admin
 * @returns the collection of complaints assigned to the admin
 */
const getAssignedComplaints = async (req, res) => {
	try {
		const adminId = req.user.id;
		const assignedComplaints = await validateService.getAssignedComplaints(
			adminId
		);
		res.status(HttpStatusCodes.OK).send(assignedComplaints);
	} catch (err) {}
};

/**
 * Creates a new reviewer
 * a user is promoted as a reviewer by the admin
 * @returns reviewer
 */
const createReviewer = async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);

		// check if the user exists
		const user = await userService.getUserById(userId);
		if (!user)
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.INVALID_USER });
		else {
			// checks if reviewer exists
			const existingReviewer = await reviewerService.getReviewerUser(userId);
			if (!existingReviewer) {
				// creates a new reviewer
				const reviewer = await adminService.createReviewer(
					user.id,
					user.profileId
				);

				res.status(HttpStatusCodes.CREATED).send(reviewer);
			} else {
				res.status(HttpStatusCodes.CREATED).send(existingReviewer);
			}
		}
	} catch (err) {
		console.log(err);
	}
};

/**
 * Assigns work
 * @returns work
 */
const assignWork = async (req, res) => {
	try {
		const validatedId = parseInt(req.params.validateId);
		const adminId = req.user.id;

		const validated = await validateService.getValidateById(validatedId);

		if (!validated)
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.NOT_VALIDATED });
		else if (validated.assignedTo !== adminId)
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.NO_PERMISSION });
		else {
			const complaintId = validated.complaintId;
			let work = await workService.isWorkAssignedToComplaint(complaintId);
			if (!work) {
				const workData = {
					complaintId: complaintId,
					adminId: adminId,
					validatedId: validatedId,
					workerName: req.body.workerName,
					workerContact: req.body.workerContact,
					status: COMPLAINT_STATUS.WORK_ASSIGNED,
					remarks: req.body.remarks || "",
				};

				work = await workService.createWork(workData);
				await complaintService.updateComplaintStatus(
					complaintId,
					COMPLAINT_STATUS.WORK_ASSIGNED
				);
			}
			res.status(HttpStatusCodes.OK).send(work);
		}
	} catch (err) {
		console.log(err);
	}
};

const closeComplaint = () => {};

export default {
	getAllUsers,
	getAllAdmins,
	getAssignedComplaints,
	createReviewer,
	assignWork,
};
