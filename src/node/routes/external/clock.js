const nodeData = require('../../nodeData');

module.exports = (req, res) => {

	const response = `${nodeData.name}_${nodeData.counter}, ${nodeData.clock}`;

	res.send(response);
};
