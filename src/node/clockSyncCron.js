const {
	helpers: { delay },
	logger,
} = require('../utils');

const nodeData = require('./nodeData');
const startElection = require('./startElection');

const CLOCK_SYNC_FREQUENCY = nodeData.nodeIds.length; // seconds;

let interval = null;

async function startInterval() {
	await delay((nodeData.nodeIds.indexOf(nodeData.id) + 1) * 1000);
	// no inital long delay
	syncClock();
	interval = setInterval(syncClock, CLOCK_SYNC_FREQUENCY * 1000);
}

function stopInterval() {
	clearInterval(interval);
}

module.exports = {
	start: startInterval,
	stop: stopInterval,
};

function syncClock() {
	if (!nodeData.coordinator) {
		logger.debug('no coordinator, starting election');
		stopInterval();

		startElection();

		// pause sync, start election
	} else {
		logger.debug('syncinc clock');
		// ping coordinator for time
		// if no reply, start election
	}
}
