import complaintService from "../services/complaints.service.js";

import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";

/**
 * Get all the complaints registered to the user
 * @returns collection of complaints
 */
const getRegisteredComplaints = async (req, res) => {
	try {
		const user = req.user;
		let complaints = await complaintService.getComplaintByUser(user);
		res.status(HttpStatusCodes.OK).send(complaints);
	} catch (err) {
		console.log(err);
	}
};

/**
 * Get all the complaints
 * @returns collection of complaint
 */
const getAllComplaints = async (req, res) => {
	const user = req.user;
	try {
		const complaints = await complaintService.getAllComplaints(user.id);
		res.status(HttpStatusCodes.OK).send(complaints);
	} catch (err) {
		console.log(err);
	}
};

/**
 * Registers a new complaint
 * @returns complaint
 */
const registerComplaint = async (req, res) => {
	const user = req.user;
	const complaintData = req.complaint;
	try {
		const [errors, complaint] = await complaintService.createComplaint(
			complaintData,
			user
		);
		if (errors.length !== 0) {
			res.status(HttpStatusCodes.BAD_REQUEST).send({ message: errors });
		} else {
			console.log(`complaint registered "${complaint.title}"`);
			res.status(HttpStatusCodes.CREATED).send(complaint);
		}
	} catch (err) {
		console.log(err);
	}
};

/**
 * Updates an existing complaint
 * @returns complaint
 */
const updateComplaint = async (req, res) => {
	try {
		const user = req.user;
		const complaintId = parseInt(req.params.complaintId);
		const complaintData = req.complaint;
		const [errors, complaint] = await complaintService.updateComplaint(
			complaintId,
			user,
			complaintData
		);
		if (errors.length !== 0) {
			res.status(HttpStatusCodes.BAD_REQUEST).send({ message: errors });
		} else {
			res.status(HttpStatusCodes.OK).send(complaint);
		}
	} catch (err) {
		console.log(err);
	}
};

/**
 * Upvote a complaint
 * @returns complaint after upvoting
 */
const upVoteComplaint = async (req, res) => {
	try {
		const userId = req.user.id;
		const complaintId = parseInt(req.params.complaintId);
		const [errors, complaint] = await complaintService.upVoteComplaint(
			complaintId,
			userId
		);
		if (errors.length !== 0) {
			res.status(HttpStatusCodes.BAD_REQUEST).send({ message: errors });
		}
		res.status(HttpStatusCodes.CREATED).send(complaint);
	} catch (err) {
		console.log(err);
	}
};

/**
 * Delete a complaint
 * @returns deleted complaint
 */
const deleteComplaint = async (req, res) => {
	try {
		const complaintId = parseInt(req.params.complaintId);
		const complaint = await complaintService.removeComplaint(complaintId);
		res.status(HttpStatusCodes.OK).send(complaint);
	} catch (err) {
		console.log(err);
	}
};

export default {
	getAllComplaints,
	getRegisteredComplaints,
	registerComplaint,
	updateComplaint,
	upVoteComplaint,
	deleteComplaint,
};
