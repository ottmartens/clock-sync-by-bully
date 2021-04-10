const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const nodeData = {
	id: Number(process.env.id),
	name: process.env.name,
	counter: Number(process.env.counter),
	coordinator: null,
	time: parseTime(process.env.time),
	clock: null,
	isFrozen: false
};

function startClock() {
	nodeData.clock = setInterval(() => {
		nodeData.time = (nodeData.time + MINUTE) % DAY
	}, MINUTE)
}
function stopClock() {
	clearInterval(nodeData.clock);
}

function parseTime(time) {
	return Number(time.split(":")[0]) * HOUR +
		Number(time.split(":")[1]) * MINUTE
}
function formatTime() {
	const minutes = (nodeData.time % HOUR / MINUTE).toString()
	return `${Math.floor(nodeData.time / HOUR)}:${minutes.length === 1 ? "0" + minutes : minutes}`
}

module.exports = {
	get id() {
		return nodeData.id;
	},
	get name() {
		return nodeData.name;
	},
	get counter() {
		return nodeData.counter;
	},
	get isCoordinator() {
		return nodeData.id === nodeData.coordinator;
	},
	set time(newTime) {
		nodeData.time = parseTime(newTime)
	},
	get time() {
		return formatTime()
	},
	set isFrozen(newState) {
		nodeData.isFrozen = newState
	},
	get isFrozen() {
		return nodeData.isFrozen
	},

	startClock,
	stopClock
};
