var config = config || {};

var deps = require('./deps');

config.app = {

	name: 'templae app',
	description: 'template app for node',

};

config.server = 
{
	port: 8080
}

config.path = {

	rootpath: deps.path.normalize(__dirname + '/../')

};

module.exports = config;