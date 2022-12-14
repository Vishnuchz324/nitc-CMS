import { prisma } from "./database.service.js";

/**
 * Returns the reviewer with the given id
 */
const getReviewerById = async (reviewerId) => {
	const reviewer = await prisma.reviewer.findUnique({
		where: {
			id: reviewerId,
		},
		include: {
			user: true,
			Validated: true,
		},
	});
	return reviewer;
};

/**
 * Returns the reviewer with the given user id
 */
const getReviewerUser = async (userId) => {
	try {
		const reviewer = await prisma.reviewer.findUnique({
			where: {
				userId: userId,
			},
		});
		return reviewer;
	} catch (err) {
		throw err;
	}
};

/**
 * Retrusn all the reviewers
 */
const getAllReviewers = async () => {
	try {
		let reviewers = await prisma.reviewer.findMany({
			select: {
				id: true,
				user: {
					select: {
						department: true,
						rollNo: true,
						profile: {
							select: {
								name: true,
								email: true,
								contact: true,
							},
						},
					},
				},
				Validated: true,
			},
		});
		reviewers = reviewers.map((reviewer) => {
			const user = reviewer.user;
			const profile = reviewer.user.profile;
			delete user.profile;
			delete reviewer.user;
			return { ...reviewer, ...user, ...profile };
		});
		return reviewers;
	} catch (err) {
		throw err;
	}
};

/**
 * Creates a reviewer
 */
const createReviewer = async (userId) => {
	try {
		const reviewer = await prisma.reviewer.create({
			data: {
				userId: userId,
			},
		});
		return reviewer;
	} catch (err) {
		throw err;
	}
};

export default {
	getReviewerById,
	getAllReviewers,
	getReviewerUser,
	createReviewer,
};
