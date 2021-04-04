module.exports = {
	delay: async (ms) => await new Promise((resolve) => setTimeout(resolve, ms)),
	getUrlForNode(nodeId) {
		return `http://localhost:${3000 + nodeId}`;
	},
};
