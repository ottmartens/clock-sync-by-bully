const express = require('express');

const logger = require('../utils/logger');
const nodeData = require('./nodeData');
const clockSync = require('./clockSyncCron.js');

nodeData.startClock();

const app = express();
app.use(express.json());

require('./routes')(app);

const port = 3000 + nodeData.id;

clockSync.start();

app.listen(port, () => logger.info('started'));
