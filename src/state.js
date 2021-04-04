const state = {
	nodes: [],
};

module.exports = {
	get nodes() {
		return state.nodes;
	},
	set nodes(nodes) {
		state.nodes = nodes;
	},
};
