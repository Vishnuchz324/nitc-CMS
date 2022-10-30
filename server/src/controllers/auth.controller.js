import authService from "../services/auth.service.js";
import profileService from "../services/profile.service.js";
import userService from "../services/user.service.js";

import {
	HttpStatusCodes,
	HttStatusMessage,
} from "../services/enums/errors.enum.js";

/**
 * User Signin
 * @returns the access token
 */
const signIn = async (req, res) => {
	try {
		const loginData = req.loginData;
		const profile = await userService.getUser(loginData);
		if (profile) {
			profile.token = authService.generateAccesToken(profile);
			res.status(HttpStatusCodes.OK).send(profile);
			console.log(profile);
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
	try {
		// check if the email is already registered
		if (await profileService.isEmailExists(profileData.email))
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.EMAIL_EXISTS });

		// check if the contact number is already registered
		if (await profileService.isContactExists(profileData.contact))
			res
				.status(HttpStatusCodes.BAD_REQUEST)
				.send({ message: HttStatusMessage.CONTACT_EXISTS });

		// create s anew user in the database
		const [profile, errors] = await authService.createUser(profileData);
		if (errors.length !== 0) {
			res.status(HttpStatusCodes.BAD_REQUEST).send({ message: errors });
		}
		// generates an access token
		profile.token = authService.generateAccesToken(profile);
		console.log(`created profile ${profile.name}`);
		res.status(HttpStatusCodes.CREATED).send(profile);
	} catch (err) {
		console.log(err);
	}
};

export default { signIn, signUp };
