const clockSyncCron = require('../../clockSyncCron');
const nodeData = require('../../nodeData');
const startElection = require('../../startElection');

module.exports = (req, res) => {
	let response;

	if (nodeData.isFrozen) {
		nodeData.time = process.env.time;
		nodeData.isFrozen = false;

		response = `Process ${nodeData.name} was unfrozen with internal time ${nodeData.time}`;

		if (nodeData.isCoordinator) {
			startElection();
		} else {
			clockSyncCron.start();
		}
	} else {
		response = `Process ${nodeData.name} is not freezed`;
	}

	res.send(response);
};
