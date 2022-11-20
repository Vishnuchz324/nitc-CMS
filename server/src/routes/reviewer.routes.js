import express from "express";
import reviewerController from "../controllers/reviewer.controller.js";
import {
	verifyAdmin,
	verifyReviewerOrAdmin,
} from "../middleware/auth.middleware.js";
import {
	validateBody,
	validateQuery,
	validator,
} from "../middleware/validator.middleware.js";
/**
 * @namespace reviewerRouter
 */
const router = express.Router();

/**
 * Route to fetch all reviewers.
 * @name get/
 */
router.get("/", verifyReviewerOrAdmin, reviewerController.getAllReviewers);

/**
 * Route to fectgh a reviewer by id.
 * @name get/:[reviewerId]
 */
router.get(
	"/:reviewerId",
	validator([validateQuery("reviewerId").exists().toInt().isNumeric()]),
	verifyReviewerOrAdmin,
	reviewerController.getReviewer
);

/**
 * Route to validate a complaint.
 * @name post/validate/[:complaintId]
 */
router.post(
	"/validate/:complaintId",
	validator([
		validateQuery("complaintId").exists().toInt().isNumeric(),
		validateBody("assignedTo").exists().toInt().isNumeric(),
		validateBody("remarks").isString().optional({ nullable: true }),
	]),
	verifyReviewerOrAdmin,
	reviewerController.validateComplaint
);

export default router;
