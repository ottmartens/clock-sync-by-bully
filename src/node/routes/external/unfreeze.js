const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	let response;

	if (nodeData.isFrozen) {
		nodeData.time = process.env.time;
		nodeData.isFrozen = false

		response = `Process ${nodeData.name} was unfrozen! Time is ${nodeData.time}`;

        // TODO: handle starting election if needed
	} else {
		response = `Process ${nodeData.name} was already unfrozen!`
	}

	res.send(response);
};
