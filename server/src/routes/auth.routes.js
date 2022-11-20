import express from "express";
import authController from "../controllers/auth.controller.js";
import { validator, validateBody } from "../middleware/validator.middleware.js";
import {
	getLoginDataFromBody,
	getProfileFromBody,
} from "../middleware/auth.middleware.js";

/**
 * @namespace authRouter
 */
const router = express.Router();

/**
 * Route for signing up.
 * @name post/signup
 */
router.post(
	"/signup",
	validator([
		validateBody("name").exists().isString(),
		validateBody("email").exists().isEmail(),
		validateBody("contact").exists().isInt(),
		validateBody("password").exists().isLength({ min: 5 }),
	]),
	getProfileFromBody,
	authController.signUp
);

/**
 * Route for signing in.
 * @name post/signin
 */
router.post(
	"/signin",
	validator([
		validateBody("email").exists().isEmail(),
		validateBody("password").exists().isLength({ min: 5 }),
	]),
	getLoginDataFromBody,
	authController.signIn
);

export default router;
