'use strict';

angular.module('core').directive('secondaryMenuDirective', function() {
    //$scope, $rootScope, $broadcast, $location
    return {
        restrict: 'E',
        templateUrl: '/modules/core/directives/views/secondary-menu-directive.html',
        link: function($scope, $rootScope, $broadcast, $location) {

            $scope.secondMenuOpened = false;
            $scope.toggleSecondMenu = false;

        }
    }
});