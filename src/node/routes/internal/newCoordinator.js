const nodeData = require('../../nodeData');
const { logger } = require('../../../utils');

const clockSync = require('../../clockSyncCron');

module.exports = (req, res) => {
	const newCoordinator = Number(req.body.newCoordinator);

	nodeData.coordinator = newCoordinator;

	logger.verbose(`acknowledging ${newCoordinator} as the new coordinator`);

	clockSync.start();

	res.sendStatus(200);
};
