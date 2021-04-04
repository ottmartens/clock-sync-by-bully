const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const nodeData = {
	id: Number(process.env.id),
	name: process.env.name,
	counter: Number(process.env.counter),
	coordinator: null,
	clock: Number(process.env.time.split(":")[0]) * HOUR +
		Number(process.env.time.split(":")[1]) * MINUTE,
};

setInterval(() => {
	nodeData.clock = (nodeData.clock + MINUTE) % DAY
}, MINUTE)

function formatTime() {
	const minutes = (nodeData.clock % HOUR / MINUTE).toString()
	return `${Math.floor(nodeData.clock / HOUR)}:${minutes.length === 1 ? "0" + minutes : minutes}`
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
	get clock() {
		return formatTime()
	}
};
