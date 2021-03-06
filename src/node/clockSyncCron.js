const axios = require('axios');
const {
	helpers: { delay, getUrlForNode },
	logger,
} = require('../utils');

const nodeData = require('./nodeData');
const startElection = require('./startElection');

const CLOCK_SYNC_FREQUENCY = nodeData.nodeIds.length - 1; // seconds;

let interval = null;
let running = false;

async function startInterval() {
	if (interval == null) {
		const startedInterval = Math.random().toString(16).substr(2, 8); //random string

		running = startedInterval;
		await delay((nodeData.nodeIds.indexOf(nodeData.id) + 1) * 1000);

		// run the scheduled function immediately (without waiting for first interval time), if not stopped during the delay
		if (running === startedInterval) {
			logger.debug('starting clock sync');
			syncClock();
			interval = setInterval(syncClock, CLOCK_SYNC_FREQUENCY * 1000);
		}
	}
}

function stopInterval() {
	logger.debug('stopping clock sync');
	running = false;
	clearInterval(interval);
	interval = null
}

module.exports = {
	start: startInterval,
	stop: stopInterval,
};

async function syncClock() {
	if (!nodeData.coordinator) {
		startElection();
	} else {
		try {
			await pingCoordinatorForTime();
		} catch (err) {
			logger.warn('pinging coordinator failed');
			startElection();
		}
	}
}

async function pingCoordinatorForTime() {
	const { data: coordinatorTime } = await axios.get(
		`${getUrlForNode(nodeData.coordinator)}/time`
	);

	logger.debug('got time from coordinator: ' + coordinatorTime);

	nodeData.time = coordinatorTime;
}
