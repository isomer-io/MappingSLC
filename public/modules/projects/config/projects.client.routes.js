'use strict';

//Setting up route
angular.module('projects').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('listProjects', {
			url: '/projects',
			templateUrl: 'modules/projects/views/list-projects.client.view.html'
		}).
		state('createProject', {

			url: '/projects/create',
			templateUrl: 'modules/projects/views/create-project.client.view.html',
			controller: 'ProjectsController'
		})/*.
		state('createProject.1', {
			url: '/1',
			templateUrl: 'modules/projects/views/create-project-page1.client.view.html'
		})*/.
		state('createProject.1', {
			url: '/1',
			templateUrl: 'modules/projects/views/create-project-page2.client.view.html'
		}).
		state('createProject.2', {
			url: '/2',
			templateUrl: 'modules/projects/views/create-project-page3.client.view.html'
		}).
		state('viewProject', {
			url: '/projects/:projectId',
			templateUrl: 'modules/projects/views/view-project.client.view.html'
		}).
		state('editProject', {
			url: '/projects/:projectId/edit',
			templateUrl: 'modules/projects/views/edit-project.client.view.html'
		}).
		state('andrewShaw', {
			url: '/shaw',
			templateUrl: 'modules/projects/views/view-project.client.shaw.html'
	  	}).
		state('westsideLeadershipInstitute', {
			url: '/westside-leadership-institute',
			templateUrl: 'modules/projects/views/view-project.client.wli.html'
		}).
		state('birds', {
			url: '/birds',
			templateUrl: 'modules/projects/views/view-project.client.birds.html'
		});
	}
]);