const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	const coordinatorString = nodeData.isCoordinator ? ' (Coordinator)' : '';

	// TODO: use participatedElections size as the counter value
	const response = `${nodeData.id}, ${nodeData.name}_${
		nodeData.counter + nodeData.participatedElections.size
	}${coordinatorString}`;

	res.send(response);
};
