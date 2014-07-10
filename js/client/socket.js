var socket = socket || {};
var io = deps.socket;

socket.init = function()
{
	if(Modernizr.localstorage)
	{
		var mdw = localStorage.getItem('mdw');

		if(!mdw) mdw = JSON.stringify({});

		mdw = $.parseJSON(mdw);

		io.emit('registerSocket', mdw.user);
	}
}

socket.init();	

/**
 * response from server on creating account
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
io.on('responseRegister' , function(data)
{
	alert(data.message);

	if(data.status)
	{
		user.cleanUserForm();

		window.location = '/login';
	}
});

/**
 * response from server on login
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
io.on('responseLogin', function(data)
{
	if(data.status)
	{
		user.cleanLoginForm();

		user.user = data.data[0];

		delete user.user.password;

		cookie.set('mdw-user', JSON.stringify(user.user));

		if(Modernizr.localstorage)
		{
			var mdw = localStorage.getItem('mdw');

			if(!mdw) mdw = {};

			mdw.user = user.user;

			localStorage.setItem('mdw', JSON.stringify(mdw));
		}

		io.emit('registerSocket', user.user);

	} else {

		alert(data.message);
	}
});