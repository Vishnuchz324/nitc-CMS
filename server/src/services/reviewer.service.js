import { prisma } from "./database.service.js";

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

const getAllReviewers = async () => {
	try {
		const reviewers = await prisma.reviewer.findMany({
			include: {
				user: true,
				Validated: true,
			},
		});
		return reviewers;
	} catch (err) {
		throw err;
	}
};

export default {
	getReviewerUser,
	createReviewer,
	getAllReviewers,
	getReviewerById,
};
