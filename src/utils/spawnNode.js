const { exec } = require('child_process');
const logger = require('./logger');

module.exports = function spawnNode({ id }) {
	const nodeProcess = exec(
		`node  ./src/node/index.js`,
		{
			// env: { id, shortcuts, keySpace, gatewayNode },
		},
		() => {
			logger.info(`Node ${id} exited`);
		}
	);

	attachLogging(nodeProcess);
};

function attachLogging(nodeProcess) {
	nodeProcess.stdout.pipe(process.stdout);
	nodeProcess.stderr.pipe(process.stderr);
}
