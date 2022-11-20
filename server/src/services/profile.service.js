import { prisma } from "./database.service.js";
import { ROLES } from "./enums/auth.enum.js";

/**
 * Checks wheather the email is registered
 */
const isEmailExists = async (email) => {
	try {
		let profile = await prisma.profile.findFirst({
			where: {
				email: email,
			},
		});
		if (profile) return true;
		else false;
	} catch (err) {
		throw err;
	}
};

/**
 * Checks wheather the contact is registered
 */
const isContactExists = async (contact) => {
	try {
		let profile = await prisma.profile.findFirst({
			where: {
				contact: contact,
			},
		});
		if (profile) return true;
		else false;
	} catch (err) {
		throw err;
	}
};

/**
 * Update role of the profile
 */
const updateProfileRole = async (profileId, role) => {
	try {
		let profile = await prisma.profile.update({
			where: {
				id: profileId,
			},
			data: {
				role: role,
			},
		});

		return profile;
	} catch (err) {
		throw err;
	}
};

/**
 * Returns the profile with the passed credentials
 */
const getProfileFromData = async (loginData) => {
	let profile = await prisma.profile.findUnique({
		where: {
			email: loginData.email,
		},
		include: {
			User: true,
			Admin: true,
		},
	});
	return profile;
};

const getProfileFromId = async (profileId) => {
	let profile = await prisma.profile.findUnique({
		where: {
			id: profileId,
		},
		select: {
			name: true,
			email: true,
			contact: true,
			role: true,
			User: {
				select: {
					department: true,
					rollNo: true,
				},
			},
			Admin: {
				select: {
					designation: true,
				},
			},
		},
	});
	if (profile.role === ROLES.USER || profile.role === ROLES.REVIEWER) {
		profile.department = profile.User.department;
		profile.rollNo = profile.User.rollNo;
	} else {
		profile.designation = profile.Admin.designation;
	}
	delete profile.User;
	delete profile.Admin;
	return profile;
};
export default {
	isContactExists,
	isEmailExists,
	getProfileFromData,
	getProfileFromId,
	updateProfileRole,
};
