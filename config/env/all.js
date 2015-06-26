'use strict';

module.exports = {
	app: {
		title: 'Mapping Salt Lake City',
		description: 'Mapping Salt Lake City is a community-created archive of Salt Lake City’s neighborhoods and people that documents the city’s changes through art, critical and creative literature, personal maps and multimedia projects. We invite people to engage with and evolve this site by submitting their own contributions.',
		keywords: 'mapping, map, geojson, salt lake city, utah, art, humanities, digital humanities, nonfiction, essays, storytelling, salt lake county, paisley rekdal, chris tanseer'
	},
	port: process.env.PORT || 3000,
	httpsPort: process.env.PORT || 3001,
	templateEngine: 'swig',
	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	// The session cookie settings
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'yourdomain.com'
	},
	// The session cookie name
	sessionName: 'connect.sid',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-material/angular-material.min.css',
				'//api.tiles.mapbox.com/mapbox.js/v2.1.9/mapbox.css',
				'public/lib/sidebar-v2/css/leaflet-sidebar.min.css',
				'public/lib/font-awesome/css/font-awesome.min.css',
				'public/lib/ng-ckeditor/ng-ckeditor.css',
				'public/lib/angular-tablesort/tablesort.css',
				'public/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css',
				'public/lib/c3/c3.min.css'

			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-aria/angular-aria.min.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-messages/angular-messages.min.js',
				'public/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js',
				'public/lib/angular-material/angular-material.min.js',
				'public/lib/modernizr/modernizr.js',
				'//api.tiles.mapbox.com/mapbox.js/v2.1.9/mapbox.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/jquery/dist/jquery.js',
				'public/lib/underscore/underscore-min.js',
				'public/lib/rangy/rangy-core.js',
				'public/lib/ng-file-upload/ng-file-upload-all.min.js',
				'public/lib/ng-file-upload/FileAPI.min.js',
				'public/lib/d3/d3.min.js',
				'public/lib/ng-ckeditor/libs/ckeditor/ckeditor.js',
				'public/lib/ng-ckeditor/ng-ckeditor.js',
				'public/lib/sidebar-v2/js/leaflet-sidebar.js',
				'//maps.stamen.com/js/tile.stamen.js?v1.3.0',
				'public/lib/classie/classie.js',
				'public/lib/masonry/dist/masonry.pkgd.min.js',
				'public/lib/imagesloaded/imagesloaded.pkgd.js',
				'public/lib/angular-tablesort/js/angular-tablesort.js',
				'public/lib/moment/min/moment.min.js',
				'public/lib/c3/c3.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
