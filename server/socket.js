var socket = socket = {};
var deps = require('./deps');
var database = require('./database');
var __ = deps.underscore;
var io = deps.socket;

socket.sockets = {};
socket.userSockets = {};

socket.init = function()
{
	console.log('initialize socket system');

	io.on('connection', function(currentSocket)
	{
		socket.sockets[currentSocket.id] = currentSocket;
		console.log('[Socket] a user connected');

		/**
		 * Register user
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		currentSocket.on('registerUser', function(data)
		{
			database.db.users.find({ $or: [{username: data.username}, {email: data.email}] }, function(err, docs)
			{
				if(err)
				{
					throw err;
				}

				if(__.isEmpty(docs))
				{
					database.db.users.insert(data, function(err, key)
					{
						if(err)
						{
							throw err;
						}

						var send = {};

						send.status = true;

						send.message = 'account created';

						send._id = key;

						currentSocket.emit('responseRegister', send);
					})

				} else {

					var send = {};

					send.status = false;

					send.message = 'emal or username already registered';

					currentSocket.emit('responseRegister', send);
				}
			})
		});

		/**
		 * user login
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		currentSocket.on('login', function(data)
		{
			database.db.users.find({ $or : [{username: data.username, password: data.password}, {email: data.username, password: data.password}]}, function(err, docs)
			{
				if(err)
				{
					throw err;
				}

				if(__.isEmpty(docs))
				{
					currentSocket.emit('responseLogin', {message:'username or email not found', status:false})

				} else {

					currentSocket.emit('responseLogin', {message:'', status:true, data: docs});
				}
			});
		});

		currentSocket.on('registerSocket', function(data)
		{
			if(!data)
			{
				return false;
			}

			socket.userSockets[data._id] = {user: data, socket: currentSocket};
		});

	});
}

module.exports = socket;