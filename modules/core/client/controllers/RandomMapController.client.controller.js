'use strict';

// Controller that serves a random static map for secondary views
angular.module('core').controller('RandomMapController', ['$scope', '$stateParams', '$location', 'RandomMapService',
    function($scope, $stateParams, $location, RandomMapService) {

        $scope.staticMap = RandomMapService.getRandomMap();
        $scope.myFunction = function(){
            console.log('error loading that map!');
        };

    }
]);

