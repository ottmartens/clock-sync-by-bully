const {
	parseInputFile,
	spawnNode,
	helpers: { delay },
} = require('./utils');

const cli = require('./cli');
const state = require('./state');

async function bootstrap() {
	const inputFile = process.argv[2];

	const nodes = await parseInputFile(inputFile);

	const nodeIds = nodes.map(({ id }) => Number(id));

	for (const node of nodes) {
		spawnNode(node, nodeIds);
		await delay(50);
	}

	state.nodes = nodeIds;

	await delay(1700);
}

async function main() {
	await bootstrap();
	cli.run();
}

main();
