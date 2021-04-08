const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	let response;

	if (!nodeData.isFrozen) {
		nodeData.stopClock();
		nodeData.isFrozen = true

		response = `Process ${nodeData.name} was frozen! Time is ${nodeData.time}`;
	} else {
		response = `Process ${nodeData.name} was already frozen!`
	}

	res.send(response);
};
