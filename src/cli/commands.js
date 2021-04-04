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
	// 		const key = Number(commandArgs[0]);
	// 		return key >= start && key <= end;
	// 	},
	// 	handler: async (nodeId) => {
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

	clock: {
		handler: async () => {
			const responses = await Promise.all(
				state.nodes.map(async (id) =>
					axios.get(`${getUrlForNode(id)}/clock`).then((res) => res.data)
				)
			);

			for (const response of responses) {
				logger.info(response);
			}
		},
	},
};
