import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { validator, validate } from "../middleware/validator.middleware.js";
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
 * @name put/signin
 * validate - validate the body data with the provided constraints
 * getLoginData - extracts the login data from the request body
 * signIn - controller handling signIn
 */
router.post(
	"/signin",
	validator([
		validate("email").exists().isEmail(),
		validate("password").exists().isLength({ min: 5 }),
	]),
	getLoginDataFromBody,
	signIn
);

/**
 * Route serving signup form.
 * @name post/signup
 * validate - validate the body data with the provided constraints
 * getProfileFromBody - extracts the profile data from the request body
 * signUp - controller handling signUp
 */
router.post(
	"/signup",
	validator([
		validate("name").exists().isString(),
		validate("email").exists().isEmail(),
		validate("contact").exists().isInt(),
		validate("role").exists().isIn(["USER", "ADMIN", "REVIEWER"]),
		validate("password").exists().isLength({ min: 5 }),
	]),
	getProfileFromBody,
	signUp
);

export default router;
