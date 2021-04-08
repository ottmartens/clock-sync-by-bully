const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	nodeData.stopClock();

	const response = `Time was stopped! Time is ${nodeData.time}`;

	res.send(response);
};
