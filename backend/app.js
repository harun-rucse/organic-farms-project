const express = require('express');
const app = express();

require('./startup/global-middleware')(app);
require('./startup/routes')(app);

module.exports = app;
