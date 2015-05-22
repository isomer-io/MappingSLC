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

			//admin projects routes
			.state('adminProjectsQueue', {
				url: '/admin/projects-queue',
				templateUrl: 'modules/admins/views/projects/admin-projects-queue.client.view.html'
			})
			.state('adminEditProject', {
				url: '/admin/edit-project/:projectId',
				templateUrl: 'modules/admins/views/messages/admin-edit-project.client.view.html'
			})

			//admin contact form routes
			.state('adminListMessages', {
				url: '/admin/messages',
				templateUrl: 'modules/admins/views/messages/admin-list-messages.client.view.html'
			})
			.state('adminViewMessage', {
				url: '/admin/messages/:contactId',
				templateUrl: 'modules/admins/views/messages/admin-view-message.client.view.html'
			})

			//admin user routes
			.state('adminListUsers', {
				url: '/admin/users',
				templateUrl: 'modules/admins/views/users/admin-list-users.client.view.html'
			})
			.state('adminEditUser', {
				url: '/admin/edit-user',
				templateUrl: 'modules/admins/views/users/admin-edit-user.client.view.html'
			})
			.state('listUsers', {
				url: '/users',
				templateUrl: 'modules/users/views/list-users.client.view.html'
			}).
			state('createUser', {
				url: '/users/create',
				templateUrl: 'modules/users/views/create-user.client.view.html'

			//}).
			//
			//state('viewUser', {
			//	url: '/users/:userId',
			//	templateUrl: 'modules/users/views/view-user.client.view.html'
			//}).
			//state('editUser', {
			//	url: '/users/:userId/edit',
			//	templateUrl: 'modules/users/views/edit-user.client.view.html'

			})
	}

]);