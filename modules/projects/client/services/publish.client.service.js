'use strict';

angular.module('projects').service('PublishingService', ['$http',
  function ($http) {

    this.getPublishedProjects = function () {
      console.log('publishing service');
      $http.get('/api/v1/projects/published').
      success(function (data) {
        console.log('data:\n', data);
        return data;
      }).
      error(function (data, error) {
        console.log('publishing error:\n', data, '\n', error);
      });

    };

  }
]);
