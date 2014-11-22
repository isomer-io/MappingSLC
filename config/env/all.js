'use strict';

module.exports = {
	app: {
		title: 'Mapping Salt Lake City',
		description: 'MEANjs',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/font-awesome/css/font-awesome.min.css',
				'public/lib/ng-ckeditor/ng-ckeditor.css',
				'public/lib/angular-mapbox/lib/mapbox.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/rangy/rangy-core.js',
				'public/lib/leaflet/dist/leaflet.js',
				'public/lib/angular-mapbox/lib/mapbox.js',
				'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.js',
				'//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.3/Leaflet.fullscreen.min.js',
				'public/lib/ng-ckeditor/libs/ckeditor/ckeditor.js',
				'public/lib/ng-ckeditor/ng-ckeditor.js',
				'//modernizr.com/downloads/modernizr-latest.js',
				'//maps.googleapis.com/maps/api/js?libraries=places&sensor=false',
				'public/lib/ngAutocomplete/src/ngAutocomplete.js'
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