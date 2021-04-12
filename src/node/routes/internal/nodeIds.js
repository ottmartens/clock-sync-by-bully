const nodeData = require('../../nodeData');
const clockSync = require('../../clockSyncCron.js');

module.exports = (req, res) => {

	nodeData.nodeIds = req.body.nodeIds
	clockSync.stop();
	clockSync.start();

	res.sendStatus(200);
};
