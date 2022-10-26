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
	const complaints = prisma.complaint.findMany({
		where: {
			userId: user.id,
		},
	});
	return complaints;
};

/**
 * Returns all the registered complaints
 * @returns  {object[]} - complaints array
 */
const getAllComplaints = async () => {
	const complaints = await prisma.complaint.findMany({
		where: {
			status: COMPLAINT_STATUS.NOT_VERIFIED,
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
const updateComplaint = async (complaintId, user, complaintData) => {
	let errors = [];
	let complaint = await getComplaintById(complaintId);
	if (!complaint) errors.push(HttStatusMessage.INVALID_COMPLAINT);
	if (complaint.userId !== user.id)
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

export default {
	createComplaint,
	getAllComplaints,
	getComplaintByUser,
	updateComplaint,
};
