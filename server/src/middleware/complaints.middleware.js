import { COMPLAINT_STATUS } from "../services/enums/complaint.enum.js";
import { HttpStatusCodes } from "../services/enums/errors.enum.js";

/**
 * Extracts the complaint details from the request body
 * appends the object {complaint} to the request body
 */
const getComplaintFromBody = (req, res, next) => {
	try {
		const body = req.body;
		const complaint = {
			title: body.title,
			description: body.description || "",
			status: COMPLAINT_STATUS.NOT_VERIFIED,
		};
		req.complaint = complaint;
		next();
	} catch (err) {
		req.status(HttpStatusCodes.SERVER_FAILURE).send({ message: err.message });
	}
};

export { getComplaintFromBody };
