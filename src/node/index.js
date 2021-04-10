const express = require('express');

const logger = require('../utils/logger');
const nodeData = require('./nodeData');

nodeData.startClock();

const app = express();
app.use(express.json());

require('./routes')(app);

if (nodeData.id === 1) {
	setTimeout(() => {
		require('./startElection')();
	}, 3000);
}

const port = 3000 + nodeData.id;

app.listen(port, () => logger.info('started'));
