'use strict';

angular.module('map').controller('MapController', ['$scope', 'Authentication', '$http', 'mapboxMap',
      function($scope, Authentication, $http, mapboxMap) {

            $scope.markers = true;
            $scope.filters = true;
            $scope.mapboxMap = mapboxMap();

      }
]);
