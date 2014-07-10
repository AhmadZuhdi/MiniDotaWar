var database = database || {};
var deps = require('./deps');
var config = require('./config');
var path = deps.path;
var rootpath = config.path.rootpath;
var __ = deps.underscore;
var datastore = deps.database;
database.db = {};

database.init = function(){

	console.log('initialize database system')

	database.db.users = new datastore({filename: rootpath + '/server/database/users.db', autoload: true});
	database.db.heroes = new datastore({filename: rootpath + '/server/database/heroes.db', autoload: true});

	return database;
}

module.exports = database;