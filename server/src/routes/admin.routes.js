import express from "express";
import adminController from "../controllers/admin.controller.js";
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
 * @namespace adminRouter
 */
const router = express.Router();

/**
 * Route to fetch all the admins.
 * @name get/
 */
router.get("/", verifyReviewerOrAdmin, adminController.getAllAdmins);

/**
 * Route to fetch all the users.
 * @name get/users
 */
router.get("/users", verifyAdmin, adminController.getAllUsers);

/**
 * Route for registering a reviewer.
 * @name get/close/[:validatedId]
 */
router.get(
	"/close/:validateId",
	validator([validateQuery("validateId").exists().toInt().isNumeric()]),
	verifyAdmin,
	adminController.closeComplaint
);

/**
 * Route to fetch all the assigned complaints
 * @name get/assigned
 */
router.get("/assigned", verifyAdmin, adminController.getAssignedComplaints);

/**
 * Route for registering a reviewer.
 * @name post/register/reviewer/[:userId]
 */
router.post(
	"/register/reviewer/:userId",
	validator([validateQuery("userId").exists().toInt().isNumeric()]),
	verifyAdmin,
	adminController.createReviewer
);

/**
 * Route for registering a reviewer.
 * @name post/assign/[:validatedId]
 */
router.post(
	"/assign/:validateId",
	validator([
		validateQuery("validateId").exists().toInt().isNumeric(),
		validateBody("workerName").exists().isString(),
		validateBody("workerContact").exists().isString(),
		validateBody("remarks").isString().optional({ nullable: true }),
	]),
	verifyAdmin,
	adminController.assignWork
);

export default router;
