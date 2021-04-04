const axios = require('axios');

const state = require('../state');
const {
	logger,
	helpers: { getUrlForNode },
} = require('../utils');

module.exports = {
	// join: {
	// 	args: ['node id'],
	// 	validate: (commandArgs) => {
	// 		if (commandArgs.length !== 1 || isNaN(Number(commandArgs[0]))) {
	// 			return false;
	// 		}

	// 		const key = Number(commandArgs[0]);

	// 		const [start, end] = stats.getKeySpace();

	// 		return key >= start && key <= end;
	// 	},
	// 	handler: async (nodeId) => {
	// 		const id = Number(nodeId);

	// 		spawnNode({
	// 			id,
	// 			keySpace: JSON.stringify(stats.getKeySpace()),
	// 			gatewayNode: stats.getNodes()[0],
	// 		});

	// 		stats.setNodes(stats.getNodes().concat([id]));

	// 		await delay(200);
	// 	},
	// },

	list: {
		handler: async () => {
			const responses = await Promise.all(
				state.nodes.map(async (id) =>
					axios.get(`${getUrlForNode(id)}/list`).then((res) => res.data)
				)
			);

			for (const response of responses) {
				logger.info(response);
			}
		},
	},
};
