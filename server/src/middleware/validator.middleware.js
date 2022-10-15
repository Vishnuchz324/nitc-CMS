import {
	validationResult,
	body,
} from "express-validator";

const validator = (validations) => {
	return async (req, res, next) => {
		await Promise.all(
			validations.map((validation) =>
				validation.run(req)
			)
		);

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		res
			.status(400)
			.json({ errors: errors.array() });
	};
};

const validate = (param) => body(param);
export { validator, validate };
