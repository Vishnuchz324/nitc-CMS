import { prisma } from "./database.service.js";
import { ROLES } from "./enums/auth.enum.js";
import { COMPLAINT_STATUS } from "./enums/complaint.enum.js";
import { HttStatusMessage } from "./enums/errors.enum.js";
import validateService from "./validate.service.js";

/**
 * Returns the complaint with the given id
 */
const getComplaintById = async (id) => {
	const complaint = await prisma.complaint.findUnique({
		where: {
			id: id,
		},
	});
	return complaint;
};

/**
 * Returns the complaint with the given title
 */
const getComplaintByTitle = async (title) => {
	const complaint = await prisma.complaint.findFirst({
		where: {
			title: title,
		},
	});
	return complaint;
};

/**
 * Returns the complaint registered by the given user
 */
const getComplaintByUser = async (user) => {
	let complaints = await prisma.complaint.findMany({
		where: {
			userId: user.id,
		},
		select: {
			id: true,
			title: true,
			createdAt: true,
			description: true,
			Validated: {
				select: {
					id: true,
				},
			},
			Work: {
				select: {
					id: true,
					status: true,
				},
			},
			_count: {
				select: {
					upvotedBy: true,
				},
			},
		},
		orderBy: {
			upvotedBy: {
				_count: "desc",
			},
		},
	});
	if (complaints)
		complaints.map((complaint) => {
			complaint.numVotes = complaint._count.upvotedBy;
			delete complaint._count;

			let status = COMPLAINT_STATUS.NOT_VERIFIED;
			if (complaint.Work) status = complaint.Work.status;
			else if (complaint.Validated) status = COMPLAINT_STATUS.VERIFIED;

			complaint.status = status;
			delete complaint.Work;
			delete complaint.Validated;
			complaint.createdAt = new Date(complaint.createdAt).toDateString();
			return complaint;
		});
	return complaints;
};

/**
 * Returns all the registered complaints
 */
const getAllComplaints = async (userId) => {
	let complaints = await prisma.complaint.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			userId: true,
			createdAt: true,
			Validated: {
				select: {
					id: true,
				},
			},
			Work: {
				select: {
					id: true,
					status: true,
				},
			},
			upvotedBy: {
				select: { id: true },
			},
			_count: {
				select: {
					upvotedBy: true,
				},
			},
		},
		orderBy: {
			upvotedBy: {
				_count: "desc",
			},
		},
	});
	complaints = complaints.map((complaint) => {
		const numVotes = complaint._count.upvotedBy;
		const upVotedUsers = complaint.upvotedBy;

		let upvoted = false;

		upVotedUsers.map((user) => {
			if (user.id === userId) upvoted = true;
		});
		complaint.numVotes = numVotes;
		complaint.upvoted = upvoted;

		delete complaint.upvotedBy;
		delete complaint._count;

		let status = COMPLAINT_STATUS.NOT_VERIFIED;
		if (complaint.Work) status = complaint.Work.status;
		else if (complaint.Validated) status = COMPLAINT_STATUS.VERIFIED;

		complaint.status = status;
		delete complaint.Work;
		delete complaint.Validated;
		complaint.createdAt = new Date(complaint.createdAt).toDateString();
		return complaint;
	});
	return complaints;
};

/**
 * Returns all number of upvotes to a complaint
 */
const getNumberUpVotes = async (complaintId) => {
	const numVotes = await prisma.complaint.findUnique({
		where: {
			id: complaintId,
		},
		select: {
			_count: {
				select: {
					upvotedBy: true,
				},
			},
		},
	});
	return numVotes._count.upvotedBy;
};

/**
 * Returns all the upvoted complaints
 */
const getUpvotedComplaints = async (userId) => {
	const complaints = await prisma.complaint.findMany({
		where: {
			status: COMPLAINT_STATUS.NOT_VERIFIED,
			upvoted: {
				some: {
					id: userId,
				},
			},
		},
	});
	return complaints;
};

/**
 * Creates a new complaint in the database
 */
const createComplaint = async (complaintData, user) => {
	let errors = [];
	let complaint = {};
	if (await getComplaintByTitle(complaintData.title))
		errors.push(HttStatusMessage.COMPLAINT_EXISTS);
	if (user.role !== ROLES.USER) errors.push(HttStatusMessage.INVALID_ROLE);
	if (errors.length === 0)
		try {
			complaint = await prisma.complaint.create({
				data: {
					title: complaintData.title,
					description: complaintData.description,
					numVotes: complaintData.numVotes,
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			});
		} catch (err) {
			throw err;
		}
	return [errors, complaint];
};

/**
 * Deletes a complaint
 */
const removeComplaint = async (complaintId) => {
	try {
		await validateService.removeComplaintFromValidation(complaintId);
		const complaint = await prisma.complaint.delete({
			where: {
				id: complaintId,
			},
		});
		return complaint;
	} catch (err) {
		throw err;
	}
};

/**
 * Update a complaint
 */
const updateComplaint = async (complaintId, user, complaintData) => {
	let errors = [];
	let complaint = {};
	try {
		// check if the complaint with the given id exists
		let complaintById = await getComplaintById(complaintId);
		if (!complaintById) errors.push(HttStatusMessage.INVALID_COMPLAINT);
		else {
			// checks if the user has permission to acces the complaint
			if (complaintById.userId !== user.id)
				if (user.role !== ROLES.REVIEWER && user.role !== ROLES.ADMIN)
					errors.push(HttStatusMessage.NO_PERMISSION);

			// checks if another complaint xists with the same title
			if (complaintData.title) {
				let complaintWithTitle = await getComplaintByTitle(complaintData.title);
				if (complaintWithTitle) {
					console.log(complaintWithTitle, complaintId);
					if (complaintWithTitle.id !== complaintId)
						errors.push(HttStatusMessage.COMPLAINT_EXISTS);
				}
			}

			complaintData.title = complaintData.title || complaintById.title;
			complaintData.description =
				complaintData.description || complaintById.description;
		}

		if (errors.length === 0) {
			complaint = await prisma.complaint.update({
				where: {
					id: complaintId,
				},
				data: {
					title: complaintData.title,
					description: complaintData.description,
				},
			});
		}
	} catch (err) {
		throw err;
	}
	return [errors, complaint];
};

/**
 * Upvotes a complaint
 */
const upVoteComplaint = async (complaintId, userId) => {
	let errors = [];
	let complaint = {};
	let numVotes;
	let complaintExists = await getComplaintById(complaintId);
	if (!complaintExists) errors.push(HttStatusMessage.INVALID_COMPLAINT);
	if (errors.length === 0)
		try {
			complaint = await prisma.complaint.update({
				where: {
					id: complaintId,
				},
				data: {
					upvotedBy: {
						connect: {
							id: userId,
						},
					},
				},
			});
			numVotes = await getNumberUpVotes(complaintId);
			complaint.numVotes = numVotes;
		} catch (err) {
			throw err;
		}
	return [errors, complaint];
};

export default {
	getComplaintById,
	getComplaintByUser,
	getAllComplaints,
	getUpvotedComplaints,
	createComplaint,
	removeComplaint,
	updateComplaint,
	upVoteComplaint,
};
