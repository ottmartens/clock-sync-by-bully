const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	const response = `${nodeData.id},${nodeData.name}_${nodeData.counter}${
		nodeData.isCoordinator ? '(Coordinator)' : ''
	}`;

	res.send(response);
};
