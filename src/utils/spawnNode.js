const { exec } = require('child_process');
const logger = require('./logger');

const debugLogging = process.argv[process.argv.length - 1] === 'debug';

module.exports = function spawnNode({ id, name, counter, time }, nodeIds) {
	const nodeProcess = exec(
		`node  ./src/node/index.js ${debugLogging ? 'debug' : ''}`,
		{
			env: {
				id,
				name,
				counter,
				time,
				nodeIds: JSON.stringify(nodeIds),
			},
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
