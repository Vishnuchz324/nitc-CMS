import complaintsService from "./complaints.service.js";
import { prisma } from "./database.service.js";
import { COMPLAINT_STATUS, VALIDATION_STATUS } from "./enums/complaint.enum.js";

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

const removeFromValidation = async (complaintId) => {
	try {
		const validatedComplaints = await prisma.validated.delete({
			where: {
				complaintId: complaintId,
			},
		});
		return validatedComplaints;
	} catch (err) {}
};

const validateComplaint = async (complaintId, adminId, reviewerId, remarks) => {
	try {
		const validated = await prisma.validated.create({
			data: {
				complaintId: complaintId,
				reviewerId: reviewerId,
				assignedTo: adminId,
				status: VALIDATION_STATUS.FORWARDED,
				remarks: remarks,
			},
		});
		await complaintsService.updateComplaintStatus(
			complaintId,
			COMPLAINT_STATUS.VERIFIED
		);
		return validated;
	} catch (err) {
		throw err;
	}
};

const getAssignedComplaints = async (adminId) => {
	try {
		let assignedComplaints = await prisma.validated.findMany({
			where: {
				assignedTo: adminId,
			},
			select: {
				remarks: true,
				validatedAt: true,
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
			const validatedAt = assignedComplaint.validatedAt;
			delete assignedComplaint.complaint;
			delete assignedComplaint.validatedAt;
			return { ...complaint, ...assignedComplaint, forwardedAt: validatedAt };
		});
		return assignedComplaints;
	} catch (err) {
		throw err;
	}
};

export default {
	validateComplaint,
	isValidated,
	getAssignedComplaints,
	removeFromValidation,
};
