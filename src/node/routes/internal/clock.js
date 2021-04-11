const nodeData = require('../../nodeData');

module.exports = (req, res) => {
	if (!nodeData.isCoordinator) {
		res.status(403).send('not the coordinator');

		return;
	}


    res.send(nodeData.time)
    
};
