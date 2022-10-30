import { prisma } from "./database.service.js";
import { ROLES } from "./enums/auth.enum.js";
import { COMPLAINT_STATUS } from "./enums/complaint.enum.js";
import { HttStatusMessage } from "./enums/errors.enum.js";

/**
 * Returns the complaint with the given id
 * @param {number} id - the id to be searched
 * @returns  {object} - complaint
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
 * @param {string} title - the title to be searched
 * @returns  {object} - complaint
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
 * Returns the complaint belonging to the user
 * @param {object} user - the user data
 * @returns  {object[]} - complaints array
 */
const getComplaintByUser = async (user) => {
	let complaints = await prisma.complaint.findMany({
		where: {
			userId: user.id,
		},
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
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
			return complaint;
		});
	return complaints;
};

/**
 * Returns all the registered complaints
 * @returns  {object[]} - complaints array
 */
const getAllComplaints = async (userId) => {
	let complaints = await prisma.complaint.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
			userId: true,
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
	complaints.map((complaint) => {
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

		return complaint;
	});
	return complaints;
};

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
 * creates a new complaint in the database
 * @param {object} complaintData complaint data from the client
 * @returns complaint
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
					status: complaintData.status,
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
 * Returns all the registered complaints
 * @param {number} complaintId - the id of the complaint to be modified
 * @param {object} user - the user data
 * @param {object} complaintData complaint data from the client
 * @returns  {object} - complaint
 */
const updateComplaint = async (complaintId, userId, complaintData) => {
	let errors = [];
	let complaint = await getComplaintById(complaintId);
	if (!complaint) errors.push(HttStatusMessage.INVALID_COMPLAINT);
	else if (complaint.userId !== userId)
		if (user.role !== ROLES.REVIEWER && user.role !== ROLES.ADMIN)
			errors.push(HttStatusMessage.NO_PERMISSION);
	if (errors.length === 0) {
		try {
			if (complaintData.title) {
				complaint = await getComplaintByTitle(complaintData.title);
				if (complaint) errors.push(HttStatusMessage.COMPLAINT_EXISTS);
				else {
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
			}
		} catch (err) {
			throw err;
		}
	}
	return [errors, complaint];
};

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
	createComplaint,
	getAllComplaints,
	getComplaintByUser,
	updateComplaint,
	upVoteComplaint,
};
