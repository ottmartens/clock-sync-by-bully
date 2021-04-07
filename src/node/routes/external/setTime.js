const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	nodeData.time = req.body.time

	const response = `Time was updated! New time is ${nodeData.time}`;

	res.send(response);
};
