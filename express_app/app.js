var express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
var app = express();

app.use(cors());
app.use(cookieParser());

var PivotController = require('./pivot/PivotController');
app.use('/api', PivotController);

module.exports = app;
