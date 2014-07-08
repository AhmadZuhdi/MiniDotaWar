var router = router || {};

var deps = require('./deps');
var config = require('./config');
var rootpath = config.path.rootpath;
router.init = function()
{
	deps.express.listen(config.server.port, function()
	{
		console.log('listening *:' + config.server.port);

		router.loadAllRoute();
	})
};

router.loadAllRoute = function()
{
	console.log('initialize routing system')

	deps.express.get('/', function(req, res)
	{
		res.send('hai');
	});

	deps.express.get('/:folder(js|css|img|image|images)/:subfolder(*)', function(req, res)
	{
		var params = req.params;

		var path = deps.path.normalize(rootpath + '/' + params.folder + '/' + params.subfolder);

		deps.fs.readFile(path, function(err, data)
		{
			if(err)
			{
				res.status(404).send('<center>404 file not found</center>');

				return false;
			}

			res.status(200).sendfile(path);

			return true;
		});
	});

	deps.express.get('/download/:folder(js|css|img|image|images)/:subfolder(*)', function(req, res)
	{
		var params = req.params;

		var path = deps.path.normalize(rootpath + '/' + params.folder + '/' + params.subfolder);

		deps.fs.readFile(path, function(err, data)
		{
			if(err)
			{
				res.status(404).send('<center>404 file not found</center>');

				return false;
			}

			res.status(200).download(path);

			return true;
		});
	});

	deps.express.get('*', function(req, res)
	{
		res.status(404).send('<center><h1>LOOT AT IT GO! <br /> 404!</h1></center>')

		return true;
	});
}

module.exports = router;