const { createLogger, transports, format } = require('winston');

const debugLogging = process.argv[process.argv.length - 1] === 'debug';

module.exports = createLogger({
	transports: [
		new transports.Console({
			colorize: true,
			level: debugLogging ? 'debug' : 'verbose',
		}),
	],
	format: format.combine(
		format.timestamp({ format: 'HH:mm:ss' }),
		format.colorize(),
		format.printf(({ message, level, timestamp }) => {
			const nodeId = process.env.id;

			if (nodeId) {
				return `${timestamp} ${`[${level}]`.padEnd(18)} Node ${nodeId.padEnd(
					4
				)} ${message}`;
			}

			return `${timestamp} [${level}] \t   ${message}`;
		})
	),
});
