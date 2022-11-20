import { prisma } from "./database.service.js";

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

export default {
	isWorkAssignedToComplaint,
	createWork,
};
