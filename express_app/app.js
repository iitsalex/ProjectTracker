var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors());

var PivotController = require('./petbook/PivotController');
app.use('/api', PivotController);

module.exports = app;
