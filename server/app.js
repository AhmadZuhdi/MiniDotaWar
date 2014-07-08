var app = app || {};

var deps = require('./deps');
var config = require('./config');
var rootpath = config.path.rootpath;
var bowerpath = config.path.bower;

app.init = function()
{
	// start creating minify library
	new deps.compressor.minify({

		type: 'gcc',
		fileIn: [
			bowerpath + '/jquery/dist/jquery.js',
			bowerpath + '/modernizr/modernizr.js',
			bowerpath + '/foundation/js/foundation.js',
			bowerpath + '/cookie.js/lib/cookie.js'
		],
		fileOut: rootpath + '/js/app.min.js',
		callback: function(err, min){
	        if(err)
	        {
	        	console.log(err);

	        } else {

	        	console.log('all deps created (JS)')
	        }
	    }

	});

	new deps.compressor.minify({

		type: 'sqwish',
		fileIn: [
			bowerpath + '/fontawesome/css/font-awesome.css',
			bowerpath + '/foundation/css/foundation.css',
		],
		fileOut: rootpath + '/css/app.min.css',
		callback: function(err, min){
	        if(err)
	        {
	        	console.log(err);

	        } else {

	        	console.log('all deps created (CSS)')
	        }
	    }

	});
}

var router = require('./router').init();

app.init();