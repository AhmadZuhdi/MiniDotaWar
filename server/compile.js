var deps = require('./deps');
var config = require('./config');
var rootpath = config.path.rootpath;
var bowerpath = config.path.bower;

deps.async.series({
	q:function(callback)
	{
		// start creating minify library
		new deps.compressor.minify({

			type: 'gcc',
			fileIn: [
				bowerpath + '/jquery/dist/jquery.js',
				bowerpath + '/modernizr/modernizr.js',
				bowerpath + '/foundation/js/foundation.js',
				bowerpath + '/cookie.js/cookie.min.js'
			],
			fileOut: rootpath + '/js/app.min.js',
			callback: function(err, min)
			{
		        if(err)
		        {
		        	console.log(err);

		        } else {

		        	console.log('all deps created (JS)')

		        	callback(null, 1)
		        }
		    }
		});
	},
	w: function(callback)
	{
		new deps.compressor.minify({

			type: 'sqwish',
			fileIn: [
				bowerpath + '/fontawesome/css/font-awesome.css',
				bowerpath + '/foundation/css/foundation.css',
			],
			fileOut: rootpath + '/css/app.min.css',
			callback: function(err, min)
			{
		        if(err)
		        {
		        	console.log(err);

		        } else {

		        	console.log('all deps created (CSS)')

		        	callback(null, 2)
		        }
		    }
		});
	},
	f: function(callback)
	{
		new deps.compressor.minify({

			type: 'gcc',
			fileIn: rootpath + '/js/client/*.js',
			fileOut: rootpath + '/js/client.app.min.js',
			callback: function(err, min)
			{
		        if(err)
		        {
		        	console.log(err);

		        } else {

		        	console.log('all client deps created (CSS)')

		        	callback(null, 3)
		        }
		    }
		});
	},
	e: function(callback)
	{
		console.log('ready to go!')

		callback(null, 4)
	}
})