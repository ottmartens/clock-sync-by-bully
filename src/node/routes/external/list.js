const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	const coordinatorString = nodeData.isCoordinator ? ' (Coordinator)' : '';

	const response = `${nodeData.id}, ${nodeData.name}_${nodeData.counter}${coordinatorString}`;

	res.send(response);
};
