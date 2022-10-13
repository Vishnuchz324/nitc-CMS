import winston from "winston";

const logConfiguration = {
	transports: [
		new winston.transports.Console({
			colorize: true,
		}),
		new winston.transports.File({
			filename: "../../logs/sever.log",
		}),
	],
	format: winston.format.combine(
		winston.format.label({
			label: `CMS`,
		}),
		winston.format.timestamp({
			format: "MMM-DD-YYYY HH:mm:ss",
		}),
		winston.format.prettyPrint(),
		winston.format.splat(),
		winston.format.printf(
			(info) =>
				`${info.level}: ${info.label}: ${[
					info.timestamp,
				]}: ${info.message}`
		)
	),
};

const logger = winston.createLogger(
	logConfiguration
);
export default logger;
