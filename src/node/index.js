const express = require('express');

const nodeData = require('./nodeData');

const app = express();
app.use(express.json());

require('./routes')(app);

const port = 3000 + nodeData.id;

app.listen(port, () => console.log('alive'));
