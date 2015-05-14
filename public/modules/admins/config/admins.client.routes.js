'use strict';

//Setting up route
angular.module('admins').config(['$stateProvider',
	function ($stateProvider) {
		// Projects state routing
		$stateProvider.
			state('admin', {
				url: '/admin',
				templateUrl: 'modules/admins/views/admins.client.view.html'
			})
			.state('adminProjectsQueue', {
				url: '/admin/projects-queue',
				templateUrl: 'modules/admins/views/admin-projects-queue.client.view.html'
			})
			.state('listMessages', {
				url: '/admin/messages',
				templateUrl: 'modules/admins/views/list-messages.client.view.html'
			})
			.state('viewMessage', {
				url: '/admin/messages/:contactId',
				templateUrl: 'modules/admins/views/view-message.client.view.html'
			})
			.state('adminListUsers', {
				url: '/admin/users',
				templateUrl: 'modules/admins/views/list-users.client.view.html'
			})
			.state('adminEditUser', {
				url: '/admin/edit-user',
				templateUrl: 'modules/admins/views/edit-user.client.view.html'
			});
	}

]);