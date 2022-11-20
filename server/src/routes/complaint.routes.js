import express from "express";
import {
	validateBody,
	validateQuery,
	validator,
} from "../middleware/validator.middleware.js";
import complaintController from "../controllers/complaint.controller.js";
import { getComplaintFromBody } from "../middleware/complaints.middleware.js";
import {
	verifyReviewerOrAdmin,
	verifyUser,
} from "../middleware/auth.middleware.js";

/**
 * @namespace complaintRouter
 */
const router = express.Router();

/**
 * Route to fetch complaints registerd by the user.
 * @name get/
 */
router.get("/", verifyUser, complaintController.getRegisteredComplaints);

/**
 * Route to fetch all the complaints.
 * @name get/all
 */
router.get("/all", verifyUser, complaintController.getAllComplaints);

/**
 * Route for registering a complaint.
 * @name post/register
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
 * @name put/update/[:complaintId]
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

/**
 * Route for upvoting a complaint.
 * @name put/update/[:complaintId]
 */
router.put(
	"/upvote/:complaintId",
	validator([validateQuery("complaintId").exists().toInt().isNumeric()]),
	verifyUser,
	complaintController.upVoteComplaint
);

/**
 * Route for deleting a complaint.
 * @name put/update/[:complaintId]
 */
router.delete(
	"/:complaintId",
	validator([validateQuery("complaintId").exists().toInt().isNumeric()]),
	verifyReviewerOrAdmin,
	complaintController.deleteComplaint
);
export default router;
