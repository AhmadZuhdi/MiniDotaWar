var app = app || {};

var deps = require('./deps');
var config = require('./config');
var rootpath = config.path.rootpath;
var bowerpath = config.path.bower;

app.init = function()
{
	console.log('initialize library')
}

var router = require('./router').init();
var database = require('./database').init();
var socket = require('./socket').init();

app.init();