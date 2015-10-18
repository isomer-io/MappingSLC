'use strict';


angular.module('users').controller('ContributorController', ['$scope', '$animate', '$location', 'Authentication', 'GetContributors', '$stateParams', '$http', '$modal', '$window', 'Lightbox',
  function ($scope, $animate, $location, Authentication, GetContributors, $stateParams, $http, $modal, $window, Lightbox) {

    $scope.contributors = null;
    $scope.images = [];

    /**
     * Lightbox
     */

    $scope.openLightboxModal = function (index) {
      Lightbox.openModal($scope.images, index);
    };

    $scope.init = function () {
      getContribData();
    };

    var getContribData = function() {
      GetContributors.contributors()
        .success(function (contributorsData) {
          $scope.contributors = contributorsData;
          getImages($scope.contributors);
          return $scope.images;
        }).
      error(function (errorData) {
        console.log('errorData: ', errorData);
      });
    };

    var getImages = function (contribData) {
      var i;
      for(i = 0; i < contribData.length; i++ ) {
        $scope.images.push(contribData[i].profileImageURL);
      }
    };

    $scope.changeView = function (view) {
      $location.path(view);
    };


  }
]);
