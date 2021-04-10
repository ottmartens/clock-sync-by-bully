const nodeData = require('../../nodeData');
const { logger } = require('../../../utils');

module.exports = (req, res) => {
	const newCoordinator = Number(req.body.newCoordinator);

	nodeData.coordinator = newCoordinator;

	logger.debug(`acknowledging ${newCoordinator} as the new coordinator`);

	res.sendStatus(200);
};
