const logger = require('../../utils/logger');
const nodeData = require('../nodeData');

module.exports = (app) => {
	// external
	app.get('/list', require('./external/list'));
	app.get('/clock', require('./external/clock'));
	app.post('/kill', require('./external/kill'));
	app.post('/setTime', require('./external/setTime'));
	app.post('/freeze', require('./external/freeze'));
	app.post('/unfreeze', require('./external/unfreeze'));

	// internal

	// reject all requets from other nodes when frozen
	app.use((req, res, next) => {
		if (nodeData.isFrozen) {
			logger.verbose('rejecting request to frozen node');

			// Send 'Service Unavailable'
			res.sendStatus(503);
			return;
		}
		next();
	});

	app.post('/election', require('./internal/election'));
	app.post('/new-coordinator', require('./internal/newCoordinator'));
	app.get('/time', require('./internal/time'));
};
