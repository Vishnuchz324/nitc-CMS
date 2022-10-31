import express from "express";
import {
	validateBody,
	validateQuery,
	validator,
} from "../middleware/validator.middleware.js";
import complaintController from "../controllers/complaint.controller.js";
import { getComplaintFromBody } from "../middleware/complaints.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js";

/**
 * @namespace complaintRouter
 */
const router = express.Router();

/**
 * Route to get complaints registerd by the user.
 * @name get/
 * verifyUser - ensure proper autherization and extracts the user details
 * getAllComplaints - gets all the complaints registerd by the user.
 */
router.get("/", verifyUser, complaintController.getRegisteredComplaints);

/**
 * Route to get all complaints.
 * @name get/all
 * getAllComplaints - gets all the registered complaints that are not completed.
 */
router.get("/all", verifyUser, complaintController.getAllComplaints);

/**
 * Route serving registering new complaint.
 * @name post/register
 * validate - validate the body data with the provided constraints
 * verifyUser - ensure proper autherization and extracts the user details
 * getComplaintFromBody - extracts the complaint data from the request body
 * registerComplaint - rgeisters a new complaint
 */
router.post(
	"/register",
	validator([
		validateBody("title").exists().isString().isLength({ max: 20 }),
		validateBody("description").isString(),
	]),
	verifyUser,
	getComplaintFromBody,
	complaintController.registerComplaint
);

/**
 * Route for updating the registerd complaint.
 * @name put/update/:complaintId
 * validate - validate the body data with the provided constraints
 * verifyUser - ensure proper autherization and extracts the user details
 * getComplaintFromBody - extracts the complaint data from the request body
 * updateComplaint - updated the registered complaint
 */
router.put(
	"/update/:complaintId",
	validator([
		validateQuery("complaintId").exists().toInt().isNumeric(),
		validateBody("title")
			.isString()
			.isLength({ max: 20 })
			.optional({ nullable: true }),
		validateBody("description").isString().optional({ nullable: true }),
	]),
	verifyUser,
	getComplaintFromBody,
	complaintController.updateComplaint
);

router.put(
	"/upvote/:complaintId",
	validator([validateQuery("complaintId").exists().toInt().isNumeric()]),
	verifyUser,
	complaintController.upVoteComplaint
);

export default router;
