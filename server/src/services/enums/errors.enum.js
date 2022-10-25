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
	EMAIL_EXISTS: "email already registered",
	CONTACT_EXISTS: "contact number already registered",
	NOT_REGISTERED: "user is not registered",
	INVALID_ROLE: "invalid role parameter",
	MISSING_PARAMTER: (field) => {
		`the ${field} field is not provided`;
	},
	NO_AUTHERIZATION: "access token is not provided",
	INVALID_TOKEN: "invalid access Token",
	NO_PERMISSION: "permission denied",
	COMPLAINT_EXISTS: "complaint with title already registered",
};
