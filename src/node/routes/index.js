module.exports = (app) => {
	// external
	app.get('/list', require('./external/list'));
	app.get('/clock', require('./external/clock'));
	app.post('/setTime', require('./external/setTime'));

	// internal
};
