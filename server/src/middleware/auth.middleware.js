import adminService from "../services/admin.service.js";
import authService from "../services/auth.service.js";
import { ROLES } from "../services/enums/auth.enum.js";
import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";
import profileService from "../services/profile.service.js";
import userService from "../services/user.service.js";

/**
 * Extracts the profile details from the request body
 * appends the object {profile} to the request body
 */
const getProfileFromBody = (req, res, next) => {
	try {
		const body = req.body;
		const profile = {
			name: body.name,
			email: body.email,
			password: body.password,
			contact: body.contact,
			role: body.role,
			designation: body.designation,
			department: body.department,
			rollNo: body.rollNo,
		};
		req.profile = profile;
		next();
	} catch (err) {
		throw err;
	}
};

/**
 * Extracts the login details from the request body
 * appends the object {loginData} to the request body
 */
const getLoginDataFromBody = (req, res, next) => {
	try {
		const body = req.body;
		const loginData = {
			email: body.email,
			password: body.password,
		};
		req.loginData = loginData;
		next();
	} catch (err) {
		throw err;
	}
};

/**
 * Extracts the profile/user details from the request body
 * appends the object {user} to the request body
 */
const verifyUser = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		const [err, data] = authService.verifyAccesToken(token);
		if (err)
			res
				.status(HttpStatusCodes.ACCES_FORBIDDEN)
				.send({ message: HttStatusMessage.INVALID_TOKEN });
		else {
			const role = data.role;
			let isValidProfile = false;

			if (role === ROLES.ADMIN)
				isValidProfile = await adminService.getAdminById(parseInt(data.id));
			else isValidProfile = await userService.getUserById(parseInt(data.id));

			if (!isValidProfile)
				res
					.status(HttpStatusCodes.UNAUTHORIZED)
					.send({ message: HttStatusMessage.INVALID_USER });
			else {
				data.id = parseInt(data.id);
				req.user = data;
				next();
			}
		}
	} else {
		res
			.status(HttpStatusCodes.UNAUTHORIZED)
			.send({ message: HttStatusMessage.NO_AUTHERIZATION });
	}
};

/**
 * Extracts the profile/user details from the request body
 * ensures the user is a reviewer
 */
const verifyReviewer = (req, res, next) => {
	const profile = req.user;
	if (profile) {
		if (profile.role !== ROLES.REVIEWER)
			res
				.status(HttpStatusCodes.ACCES_FORBIDDEN)
				.send({ message: HttStatusMessage.NO_PERMISSION });
		else {
			next();
		}
	} else {
		res
			.status(HttpStatusCodes.NO_AUTHERIZATION)
			.send({ message: HttStatusMessage.NO_AUTHERIZATION });
	}
};

/**
 * Extracts the profile/user details from the request body
 * ensures the user is an admin
 */
const verifyAdmin = (req, res, next) => {
	verifyUser(req, res, () => {
		const profile = req.user;
		if (profile) {
			if (profile.role !== ROLES.ADMIN)
				res
					.status(HttpStatusCodes.ACCES_FORBIDDEN)
					.send({ message: HttStatusMessage.NO_PERMISSION });
			else {
				next();
			}
		} else {
			res
				.status(HttpStatusCodes.NO_AUTHERIZATION)
				.send({ message: HttStatusMessage.NO_AUTHERIZATION });
		}
	});
};

export {
	getProfileFromBody,
	getLoginDataFromBody,
	verifyUser,
	verifyReviewer,
	verifyAdmin,
};
