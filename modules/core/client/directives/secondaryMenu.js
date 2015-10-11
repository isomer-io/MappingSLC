'use strict';

angular.module('core').directive('secondaryMenuDirective', function() {
    
    return {

        restrict: 'E',
        templateUrl: '/modules/core/client/directives/views/secondary-menu-directive.html',

        controller: function(AdminAuthService, $scope){
              $scope.isAdmin = AdminAuthService;
        },

        link: function(scope) {

            scope.secondMenuOpened = false;
            scope.toggleSecondMenu = false;

        }
    }
});
