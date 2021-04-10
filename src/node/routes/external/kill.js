const nodeData = require('../../nodeData');

module.exports = (req, res) => {

	const response = `Killing process ${nodeData.name}`

    // TODO: handle killing the coordinator

	res.send(response);

	process.exit(0)
};
