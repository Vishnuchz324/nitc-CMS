import { validationResult } from "express-validator";
import logger from "../services/logger.service.js";

const signIn = async (req, res) => {
	logger.info("from controller");
};

const signUp = async (req, res) => {
	logger.info("from controller");
	res.send("Hello");
};

export default {
	signIn,
	signUp,
};
