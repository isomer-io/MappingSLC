'use strict';

module.exports = function(app) {
	// Root routing
	//	var express = require('express'),
			//compression = require('compression'),
			var core = require('../../app/controllers/core.server.controller');


	//caching
	//var oneDay = 86400000;


	// compress responses
	//app.use(compression());

	//var server = express(); // better instead
	//server.configure(function(){
	//	server.use('/media', express.static(__dirname + '/media'));
	//	server.use(express.static(__dirname + '/public'));
	//});

	//app.use( express.static(__dirname + '/public') );

	//express static for image assests in 'uploads' folder
	//app.use(serveStatic('/uploads/users', {
		//maxAge: '1d',
		//setHeaders: setCustomCacheControl
	//}));

	//function setCustomCacheControl(res, path) {
	//	if (serveStatic.mime.lookup(path) === 'text/html') {
	//		 Custom Cache-Control for HTML files
			//res.setHeader('Cache-Control', 'public, max-age=0')
		//}
	//}


	app.route('/').get(core.index);


};
