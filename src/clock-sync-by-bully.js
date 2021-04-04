const { parseInputFile, spawnNode } = require('./utils');
const cli = require('./cli');
const { delay } = require('./utils/helpers');

async function bootstrap() {
	const inputFile = process.argv[2];

	const nodes = await parseInputFile(inputFile);

	for (const node of nodes) {
		spawnNode(node);
        await delay(50);
	}


    await delay(500);
}

async function main() {
	await bootstrap();
	cli.run();
}

main();
