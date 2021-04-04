function getUrlForNode(nodeId) {
	return `http://localhost:${3000 + nodeId}`;
}


module.exports = {
	getUrlForNode,
};
