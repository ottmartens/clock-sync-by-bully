const nodeData = {
	id: Number(process.env.id),
	name: process.env.name,
	counter: Number(process.env.counter),
	coordinator: null,
};

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
};
