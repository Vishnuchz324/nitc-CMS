import adminService from "../services/admin.service.js";
import userService from "../services/user.service.js";

import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";
import validateService from "../services/validate.service.js";

const getAllAdmins = async (req, res) => {
	try {
		const admins = await adminService.getAllAdmins();
		res.status(HttpStatusCodes.OK).send(admins);
	} catch (err) {
		console.log(err);
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers();
		res.status(HttpStatusCodes.OK).send(users);
	} catch (err) {
		console.log(err);
	}
};

const getAssignedComplaints = async (req, res) => {
	try {
		const adminId = req.user.id;
		const assignedComplaints = await validateService.getAssignedComplaints(
			adminId
		);
		res.status(HttpStatusCodes.OK).send(assignedComplaints);
	} catch (err) {}
};

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

export default {
	getAllUsers,
	getAllAdmins,
	getAssignedComplaints,
	createReviewer,
};
