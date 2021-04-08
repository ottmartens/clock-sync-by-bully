const nodeData = require('../../nodeData');

module.exports = (req, res) => {

	const response = `Killing process ${nodeData.name}`

	res.send(response);

	process.exit(0)
};
