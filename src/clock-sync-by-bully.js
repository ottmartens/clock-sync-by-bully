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

	for (const node of nodes) {
		spawnNode(node);
		await delay(50);
	}

	state.nodes = nodes.map(({ id }) => Number(id));

	await delay(500);
}

async function main() {
	await bootstrap();
	cli.run();
}

main();
