'use strict';

//Setting up route
angular.module('emails').config(['$stateProvider',
	function($stateProvider) {
		// Emails state routing
		$stateProvider.
		state('listEmails', {
			url: '/emails',
			templateUrl: 'modules/emails/views/list-emails.client.view.html'
		}).
		state('createEmail', {
			url: '/emails/create',
			templateUrl: 'modules/emails/views/create-email.client.view.html'
		}).
		state('viewEmail', {
			url: '/emails/:emailId',
			templateUrl: 'modules/emails/views/view-email.client.view.html'
		}).
		state('editEmail', {
			url: '/emails/:emailId/edit',
			templateUrl: 'modules/emails/views/edit-email.client.view.html'
		});
	}
]);