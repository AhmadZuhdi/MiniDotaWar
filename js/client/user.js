var user = user || {};

user.init = function()
{
	user.bindingRegister();
	user.bindingLogin();
}

user.bindingRegister = function()
{
	$(document).on('submit', '#register-form', function(e)
	{
		e.preventDefault();

		var username = $(this).find('#username').val();

		var email = $(this).find('#email').val();

		var password = $(this).find('#password').val();

		user.register({username: username, email: email, password: password})	

	});
}

user.register = function(data)
{
	deps.socket.emit('registerUser', data);
}

user.cleanUserForm = function()
{
	$(document).find('#register-form').find('input').each(function(key, value)
	{
		$(this).val('');
	})
}

user.bindingLogin = function()
{
	$(document).on('submit', '#login-form', function(e)
	{
		e.preventDefault();

		var username = $(this).find('#username').val();

		var password = $(this).find('#password').val();

		user.login({username: username, password: password});
	});
}

user.login = function(data)
{
	deps.socket.emit('login', data);
}

user.cleanLoginForm = function()
{
	$(document).find('#login-form').find('input').each(function(key, value)
	{
		$(this).val('');
	})
}

user.init();