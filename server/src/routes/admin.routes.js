import express from "express";
import adminController from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
	validateQuery,
	validator,
} from "../middleware/validator.middleware.js";

/**
 * @namespace adminRouter
 */
const router = express.Router();

/**
 * Route registering a reviewer.
 * @name get/reviewer
 * verifyAdmin - ensure proper autherization and extracts the admin route
 * getAllReviewers - gets all the reviewers
 */
router.get("/reviewer", verifyAdmin, adminController.getAllReviewers);

/**
 * Route registering a admin.
 * @name post/register
 * validate - validate the data with the provided constraints
 * verifyAdmin - ensure proper autherization and extracts the admin route
 * createReviewer - creates a new reviewer
 */
router.post(
	"/reviewer",
	validator([validateQuery("userId").exists().toInt().isNumeric()]),
	verifyAdmin
);

/**
 * Route registering a reviewer.
 * @name post/register/reviewer/:[userId]
 * validate - validate the data with the provided constraints
 * verifyAdmin - ensure proper autherization and extracts the admin route
 * createReviewer - creates a new reviewer
 */
router.post(
	"/register/reviewer/:userId",
	validator([validateQuery("userId").exists().toInt().isNumeric()]),
	verifyAdmin,
	adminController.createReviewer
);

export default router;
