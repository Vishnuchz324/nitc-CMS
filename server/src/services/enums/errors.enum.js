export const HttpStatusCodes = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401, // lack of authorization credentials
	ACCES_FORBIDDEN: 403, // trying to acces without essential permission
	NOT_FOUND: 404,
	CONFLICT: 409,
	SERVER_FAILURE: 500,
};

export const HttStatusMessage = {
	EMAIL_EXISTS: "email is already registered",
	CONTACT_EXISTS: "contact number is already registered",
	ROLL_NUMBER_EXISTS: "roll number is already registered",

	NOT_REGISTERED: "user is not registered",

	MISSING_PARAMTER: (field) => {
		`the ${field} field is not provided`;
	},

	NO_AUTHERIZATION: "no access token",
	NO_PERMISSION: "permission denied",

	COMPLAINT_EXISTS: "a complaint with title is already registered",
	NOT_VALIDATED: "the complaint is not validated",

	INVALID_CREDENTIALS: "invalid credentials",
	INVALID_COMPLAINT: "complaint with the given id does not exist",
	INVALID_USER: "user with the given id does not exist",
	INVALID_ADMIN: "admin with the given id does not exist",
	INVALID_TOKEN: "invalid access Token",
	INVALID_ROLE: "invalid role parameter",
};
