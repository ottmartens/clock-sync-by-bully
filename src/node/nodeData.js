const nodeData = {
	id: Number(process.env.id),
};

module.exports = {
	get id() {
		return nodeData.id;
	},
};
