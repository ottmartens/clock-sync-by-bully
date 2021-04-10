const nodeData = require('./nodeData');

module.exports = function () {
	// Random 8-char hex number
	const electionId = Math.random().toString(16).substr(2, 8);

	require('./routes/internal/election')(
		{ body: { caller: nodeData.id, electionId } },
		{ send: () => {} }
	);
};
