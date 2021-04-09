const axios = require('axios');

const state = require('../state');
const {
	logger,
	helpers: { getUrlForNode, delay },
	parseInputFile,
	spawnNode
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

	kill: {
		args: ['node id'],
		validate: (commandArgs) => {
			return commandArgs.length === 1 && !isNaN(Number(commandArgs[0]))
		},
		handler: async (id) => {
			const nodeId = Number(id);
			const response = await axios.post(`${getUrlForNode(nodeId)}/kill`).then((res) => res.data)

			logger.info(response);

			state.nodes = state.nodes.filter((node) => node !== nodeId)
		},
	},

	setTime: {
		args: ['node id', 'new time'],
		validate: (commandArgs) => {
			return commandArgs.length === 2 && !isNaN(Number(commandArgs[0]))
				&& /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(commandArgs[1]);
		},
		handler: async (id, time) => {
			const nodeId = Number(id);
			const response = await axios.post(`${getUrlForNode(nodeId)}/setTime`, { time }).then((res) => res.data)

			logger.info(response);
		},
	},

	freeze: {
		args: ['node id'],
		validate: (commandArgs) => {
			return commandArgs.length === 1 && !isNaN(Number(commandArgs[0]))
		},
		handler: async (id) => {
			const nodeId = Number(id);
			const response = await axios.post(`${getUrlForNode(nodeId)}/freeze`).then((res) => res.data)

			logger.info(response);
		},
	},

	unfreeze: {
		args: ['node id'],
		validate: (commandArgs) => {
			return commandArgs.length === 1 && !isNaN(Number(commandArgs[0]))
		},
		handler: async (id) => {
			const nodeId = Number(id);
			const response = await axios.post(`${getUrlForNode(nodeId)}/unfreeze`).then((res) => res.data)

			logger.info(response);
		},
	},

	reload: {
		handler: async () => {
			const inputFile = process.argv[2];

			const nodes = await parseInputFile(inputFile);

			for (const node of nodes) {
				if (!state.nodes.find(oldNode => oldNode === Number(node.id))) {
					spawnNode(node);
					await delay(50);
				}
			}

			state.nodes = nodes.map(({ id }) => Number(id));

			await delay(500);
		},
	},
};
