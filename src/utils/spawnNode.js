const { exec } = require('child_process');
const logger = require('./logger');

module.exports = function spawnNode({ id, name, counter, time }) {
	const nodeProcess = exec(
		`node  ./src/node/index.js`,
		{
			env: { id, name, counter, time },
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
