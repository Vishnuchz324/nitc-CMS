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
 * Route serving login form.
 * @name post/signin
 * validateBody - validate the body data with the provided constraints
 * getLoginData - extracts the login data from the request body
 * signIn - controller handling signIn
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

/**
 * Route serving signup form.
 * @name post/signup
 * validateBody - validate the body data with the provided constraints
 * getProfileFromBody - extracts the profile data from the request body
 * signUp - controller handling signUp
 */
router.post(
	"/signup",
	validator([
		validateBody("name").exists().isString(),
		validateBody("email").exists().isEmail(),
		validateBody("contact").exists().isInt(),
		validateBody("role").exists().isIn(["USER", "ADMIN", "REVIEWER"]),
		validateBody("password").exists().isLength({ min: 5 }),
	]),
	getProfileFromBody,
	authController.signUp
);

export default router;
