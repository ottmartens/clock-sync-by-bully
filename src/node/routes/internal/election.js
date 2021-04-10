const axios = require('axios');

const {
	helpers: { getUrlForNode },
	logger,
} = require('../../../utils');

const nodeData = require('../../nodeData');

module.exports = async (req, res) => {
	const caller = Number(req.body.caller);
	const electionId = req.body.electionId;

	if (caller < nodeData.id) {
		res.send('ok');
	}

	if (caller === nodeData.id) {
		logger.info('starting new election');
	} else {
		logger.debug(`got election message from ${caller}`);
	}

	if (nodeData.participatedElections.has(electionId)) {
		// logger.info('stopping cause already election message passed on');
		return;
	}

	nodeData.participatedElections.add(electionId);

	const largerNodeAknowledgements = await pingAllLargerNodes(electionId);

	if (largerNodeAknowledgements === 0) {
		// Allow all messages to propagate before announcing the next leader
		setTimeout(() => {
			logger.info('will become next coordinator');
			broadcastNewCoordinator();
		}, 200);
	}
};

async function pingAllLargerNodes(electionId) {
	const queryLargerNodes = nodeData.nodeIds
		.filter((id) => id > nodeData.id)
		.map((id) =>
			axios
				.post(`${getUrlForNode(id)}/election`, {
					caller: nodeData.id,
					electionId,
				})
				.then((res) => res.data)
				.catch(() => {})
		);

	const responses = await Promise.all(queryLargerNodes);

	return responses.filter((response) => !!response).length;
}

async function broadcastNewCoordinator() {
	Promise.all(
		nodeData.nodeIds
			.filter((id) => id < nodeData.id)
			.map((id) => {
				axios
					.post(`${getUrlForNode(id)}/new-coordinator`, {
						newCoordinator: nodeData.id,
					})
					.catch(() => {});
			})
	);
}