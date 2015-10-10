'use strict';

//Setting up route
angular.module('projects').config(['$stateProvider',
  function ($stateProvider) {
    // Projects state routing
    $stateProvider.
    state('listProjects', {
      url: '/projects',
      templateUrl: 'modules/projects/client/views/list-projects.client.view.html'
    }).
    state('createProject', {
      url: '/projects/create',
      templateUrl: 'modules/projects/client/views/create-project.client.view.html',
      authenticate: true
    }).
    state('viewProject', {
      url: '/projects/:projectId',
      templateUrl: 'modules/projects/client/views/view-project.client.view.html'
    }).
    state('editProject', {
      url: '/projects/:projectId/edit',
      templateUrl: 'modules/projects/client/views/edit-project.client.view.html'
    }).
    state('andrewShaw', {
      url: '/shaw',
      templateUrl: 'modules/projects/client/views/view-project.client.shaw.html'
    }).
    state('westsideLeadershipInstitute', {
      url: '/westside-leadership-institute',
      templateUrl: 'modules/projects/client/views/view-project.client.wli.html'
    });
  }
]);
