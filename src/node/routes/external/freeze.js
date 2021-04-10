const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	let response;

	// TODO: make sure all endpoints are unresponsive when node is frozen (except unfreeze, reload, etc)

	if (!nodeData.isFrozen) {
		nodeData.stopClock();
		nodeData.isFrozen = true;

		response = `Process ${nodeData.name} was frozen! Time is ${nodeData.time}`;
	} else {
		response = `Process ${nodeData.name} was already frozen!`;
	}

	res.send(response);
};
