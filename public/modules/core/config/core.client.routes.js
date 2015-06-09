'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('subscribeForm', {
			url: '/subscribe-form',
			templateUrl: 'modules/core/views/subscribe-form.client.view.html'
		})
		.state('uploads', {
			url: '/uploads',
			templateUrl: 'modules/core/views/file-upload.client.view.html'
		})
		.state('uploadFile', {
			url: '/uploads/:fileHash'
			//templateUrl: 'modules/users/views/create-user.client.view.html'
		});
	}
]);