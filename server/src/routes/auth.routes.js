import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller.js";
import {
	validator,
	validate,
} from "../middleware/validator.middleware.js";

router.put("/signin", authController.signIn);

router.put(
	"/signup",
	validator([
		validate("username").exists().isString(),
		validate("email").exists().isEmail(),
		validate("contact").exists().isInt(),
		validate("password")
			.exists()
			.isLength({ min: 5 }),
	]),
	authController.signUp
);
export default router;
