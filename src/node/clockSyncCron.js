const {
	helpers: { delay },
	logger,
} = require('../utils');

const nodeData = require('./nodeData');
const startElection = require('./startElection');

const CLOCK_SYNC_FREQUENCY = nodeData.nodeIds.length - 1; // seconds;

let interval = null;
let running = false;

async function startInterval() {
	running = true;
	await delay((nodeData.nodeIds.indexOf(nodeData.id) + 1) * 1000);

	// run the scheduled function immediately (without waiting for first interval time), if not stopped during the delay
	if (running) {
		syncClock();
	}
	interval = setInterval(syncClock, CLOCK_SYNC_FREQUENCY * 1000);
}

function stopInterval() {
	logger.verbose('stopping sync');
	running = false;
	clearInterval(interval);
}

module.exports = {
	start: startInterval,
	stop: stopInterval,
};

function syncClock() {
	if (!nodeData.coordinator) {
		startElection();

		// pause sync, start election
	} else {
		logger.debug('syncinc clock');
	}
}
