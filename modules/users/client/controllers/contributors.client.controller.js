'use strict';


angular.module('users').controller('ContributorController', ['$scope', '$animate', '$location', 'Authentication', 'GetContributors', '$stateParams', '$http', '$modal', '$window', 'Lightbox',
  function ($scope, $animate, $location, Authentication, GetContributors, $stateParams, $http, $modal, $window, Lightbox) {

    $scope.contributors = null;

    $scope.init = function () {
      GetContributors.contributors();
    };

    GetContributors.contributors()
      .success(function (contributorsData) {
        console.log('contributorsData: ', contributorsData);
        $scope.contributors = contributorsData;
        console.log('$scope.contributors: ', $scope.contributors);
      }).
    error(function (errorData) {
      console.log('errorData: ', errorData);
    });

    $scope.changeView = function (view) {
      $location.path(view);
    };

    /**
     * Lightbox
     */
    $scope.Lightbox = Lightbox;
    $scope.images = [];
    $scope.getImages = function () {
      var i;
      for(i = 0; i > $scope.contributors.length; i++ ) {
        $scope.images.push($scope.contributors[i].profileImageURL);
      }
    }
  }

]);
