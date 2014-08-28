'use strict';

//Setting up route
angular.module('stories').config(['$stateProvider',
	function($stateProvider) {
		// Stories state routing
		$stateProvider.
		state('listStories', {
			url: '/stories',
			templateUrl: 'modules/stories/views/list-stories.client.view.html'
		}).
		state('createStory', {
			url: '/stories/create',
			templateUrl: 'modules/stories/views/create-story.client.view.html'
		}).
		state('viewStory', {
			url: '/stories/:storyId',
			templateUrl: 'modules/stories/views/view-story.client.view.html'
		}).
		state('editStory', {
			url: '/stories/:storyId/edit',
			templateUrl: 'modules/stories/views/edit-story.client.view.html'
		});
	}
]);