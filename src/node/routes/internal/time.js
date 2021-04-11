const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	if (!nodeData.isCoordinator) {
		// send "forbidden"
		res.sendStatus(403);

		return;
	}

	res.send(nodeData.time);
};
