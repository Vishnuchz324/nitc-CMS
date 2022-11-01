import express from "express";
import adminController from "../controllers/admin.controller.js";
import {
	verifyAdmin,
	verifyReviewerOrAdmin,
} from "../middleware/auth.middleware.js";
import {
	validateQuery,
	validator,
} from "../middleware/validator.middleware.js";

/**
 * @namespace adminRouter
 */
const router = express.Router();

/**
 * Fetch all the admins.
 * @name get/
 * verifyAdmin - ensure proper autherization and extracts the admin route
 * getAllAdmins - gets all the admins
 */
router.get("/", verifyAdmin, adminController.getAllAdmins);

/**
 * Fetch all the users.
 * @name get/users
 * verifyAdmin- ensure proper autherization and extracts the admin route
 * getALlUsers - gets all the users
 */
router.get("/users", verifyAdmin, adminController.getAllUsers);

/**
 * Fetch all the assigned complaints
 * @name get/assigned
 * verifyAdmin - ensure proper autherization and extracts the admin route
 * getALlUsers - gets all the users
 */
router.get("/assigned", verifyAdmin, adminController.getAssignedComplaints);

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
