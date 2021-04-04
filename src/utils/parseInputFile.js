const fs = require('fs');
const readline = require('readline');

module.exports = async function parseInputFile(fileName) {
	return await new Promise((resolve) => {
		const response = [];

		const readInterface = readline.createInterface({
			input: fs.createReadStream(fileName),
		});

		readInterface.on('line', (line) => {
			const [id, nameWithCounter, time] = line.replace(/\s/g, '').split(',');

			const [name, counter] = nameWithCounter.split('_');

			response.push({
				id,
				name,
				counter,
				time,
			});
		});

		readInterface.on('close', () => resolve(response));
	});
};
