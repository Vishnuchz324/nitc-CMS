import { validationResult, body, param } from "express-validator";
import { HttpStatusCodes } from "../services/enums/errors.enum.js";

/**
 * Validates the request body.
 */
const validator = (validations) => {
	return async (req, res, next) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
	};
};

const validateBody = (val) => body(val);
const validateQuery = (val) => param(val);
export { validator, validateBody, validateQuery };
