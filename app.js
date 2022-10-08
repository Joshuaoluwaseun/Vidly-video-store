const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')
require('./startup/routes')(app);
require('./startup/vidlydb')()
require('./startup/config')()
require('./startup/validations')()

const port = process.env.port || 4000;
app.listen(port, () => winston.info(`listening on port ${port}...`));