const { logger } = require('../../../utils');

module.exports = (req, res) => {
	const newCoordinator = Number(req.body.newCoordinator);

	logger.debug(`acknowledging ${newCoordinator} as the new coordinator`);

	res.sendStatus(200);
};
