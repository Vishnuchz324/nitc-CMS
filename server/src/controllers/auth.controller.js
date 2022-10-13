import logger from "../services/logger.service.js";

const get = async (req, res) => {
	logger.info("from controller");
};

export default {
	get,
};
