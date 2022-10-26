import { prisma } from "./database.service.js";
import { ROLES } from "./enums/auth.enum.js";
import jwt from "jsonwebtoken";
import { HttStatusMessage } from "./enums/errors.enum.js";

/**
 * Generates an acces token
 * @param {object} profiledata -the profile data send by the client
 * @returns {string} - the encrypted access token
 */
const generateAccesToken = (profileData) => {
	return jwt.sign(
		{ id: profileData.id, email: profileData.email, role: profileData.role },
		process.env.JWT_SECRET
	);
};

/**
 * Verifies an acces token
 * @param {string} accestoken -the access token
 * @returns {object} - the data contained in the acces token
 */
const verifyAccesToken = (token) => {
	let err = null;
	let user = {};
	try {
		user = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		err = error;
	}
	return [err, user];
};

/**
 * Returns the profile data
 * @param {object} profileData - the profile data sent by the client
 * @returns  {object} - the profile data
 */
const createProfile = (profileData) => {
	return {
		name: profileData.name,
		password: profileData.password,
		email: profileData.email,
		contact: profileData.contact,
	};
};

/**
 * Creates a new user
 * @param {object} - profileData the profile data sent by the client
 * @returns {object} - list of errors and the user data
 */
const createUser = async (profileData) => {
	let errors = [];
	let user = {};
	if (profileData.role !== ROLES.USER)
		errors.push(HttStatusMessage.INVALID_ROLE);
	if (!profileData.rollNo)
		errors.push(HttStatusMessage.MISSING_PARAMTER("roll number"));
	if (!profileData.department)
		errors.push(HttStatusMessage.MISSING_PARAMTER("department"));
	if (errors.length === 0)
		try {
			user = await prisma.user.create({
				data: {
					department: profileData.department,
					rollNo: profileData.rollNo,
					profile: {
						create: { ...createProfile(profileData), role: ROLES.USER },
					},
				},
			});
			delete user.password;
		} catch (err) {
			errors.push(err.message);
		}
	return [user, errors];
};

export { createUser, generateAccesToken, verifyAccesToken };
