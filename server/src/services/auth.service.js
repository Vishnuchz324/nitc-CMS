import { ROLES } from "./enums/auth.enum.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { HttStatusMessage } from "./enums/errors.enum.js";
import userService from "./user.service.js";
import reviewerService from "./reviewer.service.js";

/**
 * Generates an acces token
 * @param {object} profiledata -the profile data send by the client
 * @returns {string} - the encrypted access token
 */
const generateAccesToken = (tokenData) => {
	return jwt.sign(tokenData, process.env.JWT_SECRET);
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

const generateHashedPassword = async (password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
};

const validateHashedPassword = async (password, hashedPassword) => {
	const isValid = await bcrypt.compare(password, hashedPassword);
	return isValid;
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
			profileData.password = await generateHashedPassword(profileData.password);
			user = userService.createUser(profileData);
			delete user.password;
		} catch (err) {
			errors.push(err.message);
		}
	return [user, errors];
};

const validateProfile = async (user, password) => {
	const hashedPassword = user.password;
	const isValid = await validateHashedPassword(password, hashedPassword);
	return isValid;
};

const generateTokenData = async (profile) => {
	const profileId = profile.id;
	const role = profile.role;
	let id;
	if (role === ROLES.ADMIN) id = profile.Admin.id;
	else {
		const userId = profile.User.id;
		if (role === ROLES.USER) id = userId;
		else {
			const reviewer = await reviewerService.getReviewerUser(userId);
			id = reviewer.id;
		}
	}
	let tokenData = {
		id: id,
		profileId: profileId,
		email: profile.email,
		role: profile.role,
	};
	console.log(tokenData);
	return tokenData;
};

export default {
	generateAccesToken,
	verifyAccesToken,
	generateTokenData,
	validateProfile,
	createUser,
};
