'use strict';

// Setting up route
//angular.module('core').config(['$stateProvider', '$urlRouterProvider', 'ngMaterial',
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	//function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');


		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('subscribeForm', {
			url: '/subscribe-form',
			templateUrl: 'modules/core/views/subscribe-form.client.view.html'
		});


		////custom themeing for Angular Material
		//$mdThemingProvider.theme('default')
		//	.primaryPalette('pink')
		//	.accentPalette('orange');

	}
]);