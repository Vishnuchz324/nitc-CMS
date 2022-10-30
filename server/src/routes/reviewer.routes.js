import express from "express";
import reviewerController from "../controllers/reviewer.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
	validateQuery,
	validator,
} from "../middleware/validator.middleware.js";
/**
 * @namespace reviewerRouter
 */
const router = express.Router();

/**
 * Route registering a reviewer.
 * @name get/:[reviewerId]
 * verifyAdmin - ensure proper autherization and extracts the admin route
 * getAllReviewers - gets all the reviewers
 */
router.get(
	"/:reviewerId",
	validator([validateQuery("reviewerId").exists().toInt().isNumeric()]),
	verifyAdmin,
	reviewerController.getReviewer
);

export default router;
