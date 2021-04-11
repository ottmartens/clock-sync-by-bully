const nodeData = require('../../nodeData');
const clockSync = require('../../clockSyncCron');

module.exports = (req, res) => {
	let response;

	if (!nodeData.isFrozen) {
		nodeData.stopClock();
		clockSync.stop();

		nodeData.isFrozen = true;

		response = `Process ${nodeData.name} was frozen with internal time ${nodeData.time}`;
	} else {
		response = `Process ${nodeData.name} was already frozen!`;
	}

	res.send(response);
};
