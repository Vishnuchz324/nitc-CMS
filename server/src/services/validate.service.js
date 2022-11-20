import complaintService from "./complaints.service.js";
import { prisma } from "./database.service.js";
import { COMPLAINT_STATUS } from "./enums/complaint.enum.js";

/**
 * Checks wheather the complaint is validated
 */
const isValidated = async (complaintId) => {
	try {
		const isValidated = await prisma.validated.findFirst({
			where: {
				complaintId: complaintId,
			},
		});
		return isValidated;
	} catch (err) {
		throw err;
	}
};

/**
 * Returns the validate table entry
 */
const getValidateById = async (validateId) => {
	try {
		const validated = await prisma.validated.findUnique({
			where: {
				id: validateId,
			},
		});
		return validated;
	} catch (err) {
		throw err;
	}
};

/**
 * Returns all the complaints assigned to an admin
 */
const getAssignedComplaints = async (adminId) => {
	try {
		let assignedComplaints = await prisma.validated.findMany({
			where: {
				assignedTo: adminId,
			},
			select: {
				id: true,
				remarks: true,
				validatedAt: true,
				Work: {
					select: {
						id: true,
						status: true,
					},
				},
				complaint: {
					select: {
						title: true,
						description: true,
					},
				},
			},
		});
		assignedComplaints = assignedComplaints.map((assignedComplaint) => {
			const complaint = assignedComplaint.complaint;
			const validatedAt = new Date(
				assignedComplaint.validatedAt
			).toDateString();
			delete assignedComplaint.complaint;
			delete assignedComplaint.validatedAt;
			let status = COMPLAINT_STATUS.VERIFIED;
			if (assignedComplaint.Work) status = assignedComplaint.Work.status;
			delete assignedComplaint.Work;
			complaint.status = status;

			return { ...complaint, ...assignedComplaint, forwardedAt: validatedAt };
		});
		return assignedComplaints;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

/**
 * Validate the given complaint
 */
const validateComplaint = async (complaintId, adminId, reviewerId, remarks) => {
	try {
		const validated = await prisma.validated.create({
			data: {
				complaintId: complaintId,
				reviewerId: reviewerId,
				assignedTo: adminId,
				remarks: remarks,
			},
		});

		return validated;
	} catch (err) {
		throw err;
	}
};

const updateStatus = async (validateId, status) => {
	try {
		const validated = await prisma.validated.update({
			where: {
				id: validateId,
			},
			data: {
				status: status,
			},
		});
		return validated;
	} catch (err) {}
};

/**
 * Remove all instances of a complaint from the validated list
 */
const removeComplaintFromValidation = async (complaintId) => {
	try {
		const validatedComplaints = await prisma.validated.delete({
			where: {
				complaintId: complaintId,
			},
		});
		return validatedComplaints;
	} catch (err) {}
};

/**
 * Remove selected entry from the validated list
 */
const removeFromValidation = async (id) => {
	try {
		const validated = await prisma.validated.delete({
			where: {
				id: id,
			},
		});
		return validated;
	} catch (err) {
		throw err;
	}
};

export default {
	isValidated,
	getValidateById,
	getAssignedComplaints,
	validateComplaint,
	updateStatus,
	removeComplaintFromValidation,
	removeFromValidation,
};
