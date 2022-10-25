import complaintService from "../services/complaints.service.js";
import { HttpStatusCodes } from "../services/enums/errors.enum.js";

/**
 * Get all the complaints registered to the user
 * @returns complaint array
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
 * @returns complaint array
 */
const getAllComplaints = async (req, res) => {
	try {
		let complaints = await complaintService.getAllComplaints();
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
		}
		console.log(`complaint registered "${complaint.title}"`);
		res.status(HttpStatusCodes.CREATED).send(complaint);
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
		const complaintId = req.params.complaintId;
		const complaintData = req.complaint;
		const [errors, complaint] = await complaintService.updateComplaint(
			complaintId,
			user,
			complaintData
		);
		if (errors.length !== 0) {
			res.status(HttpStatusCodes.BAD_REQUEST).send({ message: errors });
		}
		res.status(HttpStatusCodes.OK).send(complaint);
	} catch (err) {
		console.log(err);
	}
};

export default {
	registerComplaint,
	getAllComplaints,
	getRegisteredComplaints,
	updateComplaint,
};
