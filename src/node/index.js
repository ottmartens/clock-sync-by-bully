const express = require('express');

const logger = require('../utils/logger');
const { helpers: { getUrlForNode, delay } } = require('../utils');
const nodeData = require('./nodeData');
const clockSync = require('./clockSyncCron.js');
const { default: axios } = require('axios');

const app = express();
app.use(express.json());

require('./routes')(app);

const port = 3000 + nodeData.id;

app.listen(port, async () => {
    logger.info('started')
    await delay(2000)
    logger.info('Distributing list of nodeIds')

    let promises = []
    nodeData.nodeIds.forEach(id => {
        promises.push(
            axios.post(`${getUrlForNode(id)}/nodeIds`, { nodeIds: nodeData.nodeIds }))

    });

    Promise.all(promises).then(() => clockSync.start());
});



