const {
	parseInputFile,
} = require('./utils');

const cli = require('./cli');


async function bootstrap() {
	const inputFile = process.argv[2];

	const input = await parseInputFile(inputFile);


    console.log(input);
    
	
}

async function main() {
	await bootstrap();
	cli.run();
}

main();
