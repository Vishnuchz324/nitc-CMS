import authService from "../services/auth.service.js";
import profileService from "../services/profile.service.js";
import userService from "../services/user.service.js";

import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";
import { ROLES } from "../services/enums/auth.enum.js";

/**
 * User Signin
 * @returns the access token
 */
const signIn = async (req, res) => {
	try {
		const loginData = req.loginData;
		const profile = await profileService.getProfileFromData(loginData);
		if (profile) {
			const isValid = await authService.validateProfile(
				profile,
				loginData.password
			);
			if (!isValid) {
				res
					.status(HttpStatusCodes.BAD_REQUEST)
					.send({ message: HttStatusMessage.INVALID_CREDENTIALS });
			}

			const tokenData = await authService.generateTokenData(profile);
			const accesToken = authService.generateAccesToken(tokenData);
			res
				.status(HttpStatusCodes.OK)
				.send({
					accessToken: accesToken,
					email: loginData.email,
					role: profile.role,
				});
		} else {
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.NOT_REGISTERED });
		}
	} catch (err) {
		console.log(err);
	}
};

/**
 * Creates a new profile
 * @returns the generated profile with access token
 */
const signUp = async (req, res) => {
	const profileData = req.profile;
	console.log(profileData);
	try {
		// check if the email is already registered
		if (await profileService.isEmailExists(profileData.email))
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.EMAIL_EXISTS });
		// check if the contact number is already registered
		else if (await profileService.isContactExists(profileData.contact))
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.CONTACT_EXISTS });
		else {
			try {
				// create s anew user in the database
				const [profile, errors] = await authService.createUser(profileData);

				if (errors.length !== 0) {
					res.status(HttpStatusCodes.BAD_REQUEST).send({ message: errors });
				}
				// generates an access token
				const loggedInProfile = await profileService.getProfileFromData(
					profileData
				);
				const tokenData = await authService.generateTokenData(loggedInProfile);
				const accesToken = authService.generateAccesToken(tokenData);
				profile.token = accesToken;
				res.status(HttpStatusCodes.CREATED).send(profile);
			} catch (err) {
				res
					.status(HttpStatusCodes.BAD_REQUEST)
					.send(HttStatusMessage.ROLL_NUMBER_EXISTS);
			}
		}
	} catch (err) {
		console.log(err);
	}
};

export default { signIn, signUp };
