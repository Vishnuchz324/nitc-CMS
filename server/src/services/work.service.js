import { prisma } from "./database.service.js";
import { COMPLAINT_STATUS } from "./enums/complaint.enum.js";

const isWorkAssignedToComplaint = async (complaintId) => {
	try {
		const work = await prisma.work.findFirst({
			where: {
				complaintId: complaintId,
			},
		});
		return work;
	} catch (err) {
		throw err;
	}
};

const createWork = async (workData) => {
	try {
		const work = await prisma.work.create({
			data: {
				assignedBy: workData.adminId,
				complaintId: workData.complaintId,
				validatedId: workData.validatedId,
				status: workData.status,
				workerName: workData.workerName,
				workerContact: workData.workerContact,
				remarks: workData.remarks,
			},
		});
		return work;
	} catch (err) {
		throw err;
	}
};

const closeWork = async (validatedId) => {
	try {
		const work = prisma.work.update({
			where: {
				validatedId: validatedId,
			},
			data: {
				status: COMPLAINT_STATUS.COMPLETED,
			},
		});
		return work;
	} catch (err) {
		throw errr;
	}
};

export default {
	isWorkAssignedToComplaint,
	createWork,
	closeWork,
};
