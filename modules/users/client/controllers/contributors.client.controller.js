'use strict';


angular.module('users').controller('ContributorController', ['$scope', '$animate', '$location', 'Authentication', 'GetContributors', '$stateParams', '$http', '$modal', '$window', 'Lightbox', 'UtilsService',
  function ($scope, $animate, $location, Authentication, GetContributors, $stateParams, $http, $modal, $window, Lightbox, UtilsService) {

    $scope.contributors = null;
    $scope.images = [];
    $scope.contribData = {};

    //provides logic for the css in the forms
    UtilsService.cssLayout();

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
          getImages(contributorsData);
          $scope.contributors = contributorsData;
          return $scope.images;
        }).
      error(function (errorData) {
        console.log('errorData: ', errorData);
      });
    };

    var getImages = function (contribData) {
      for(var i = 0; i < contribData.length; i++ ) {
        var tempData = {};
        tempData.url = contribData[i].profileImageURL;
        tempData.thumbUrl = contribData[i].profileImageThumbURL;
        tempData.caption = contribData[i].bio;
        $scope.images.push(tempData);
      }

    };

    $scope.changeView = function (view) {
      $location.path(view);
    };

  }
]);
