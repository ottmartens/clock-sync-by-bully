module.exports = (app) => {
	// external
	app.get('/list', require('./external/list'));

	// internal
};
