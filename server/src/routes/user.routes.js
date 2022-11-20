import express from "express";
import userController from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

/**
 * @namespace userRouter
 */
const router = express.Router();

/**
 * Route to fetch all reviewers.
 * @name get/
 */
router.get("/", verifyUser, userController.getUser);

export default router;
