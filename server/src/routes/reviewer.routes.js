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
 * Route registering a reviewer.
 * @name get/
 * verifyReviewerOrAdmin - ensure proper autherization
 * getAllReviewers - gets all the reviewers
 */
router.get("/", verifyReviewerOrAdmin, reviewerController.getAllReviewers);

/**
 * Route registering a reviewer.
 * @name get/:[reviewerId]
 * verifyAdmin - ensure proper autherization and extracts the admin route
 * getAllReviewers - gets all the reviewers
 */
router.get(
	"/:reviewerId",
	validator([validateQuery("reviewerId").exists().toInt().isNumeric()]),
	verifyReviewerOrAdmin,
	reviewerController.getReviewer
);

/**
 * Route registering a reviewer.
 * @name post/validate/:complaintId
 * verifyReviewerOrAdmin - ensure proper autherization
 * validateComplaint - validates a complaint
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
