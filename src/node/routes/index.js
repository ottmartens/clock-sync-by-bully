module.exports = (app) => {
	// external
	app.get('/list', require('./external/list'));
	app.get('/clock', require('./external/clock'));
	app.post('/kill', require('./external/kill'));
	app.post('/setTime', require('./external/setTime'));
	app.post('/freeze', require('./external/freeze'));
	app.post('/unfreeze', require('./external/unfreeze'));

	// internal
};
