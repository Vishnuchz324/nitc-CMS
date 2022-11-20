import { HttpStatusCodes } from "../services/enums/errors.enum.js";
import profileService from "../services/profile.service.js";
import userService from "../services/user.service.js";

const getUser = async (req, res) => {
	try {
		let profileId = req.user.profileId;
		let user = await profileService.getProfileFromId(profileId);
		res.status(HttpStatusCodes.OK).send(user);
	} catch (err) {
		console.log(err);
	}
};

export default {
	getUser,
};
