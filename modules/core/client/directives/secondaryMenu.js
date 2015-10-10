'use strict';

angular.module('core').directive('secondaryMenuDirective', function() {
    //$scope, $rootScope, $broadcast, $location
    return {

        restrict: 'E',
        templateUrl: '/modules/core/client/directives/views/secondary-menu-directive.html',
        link: function(scope, $rootScope, $broadcast, $location, Users, AdminAuthService) {

            scope.secondMenuOpened = false;
            scope.toggleSecondMenu = false;

            //runs a query to return user ID for admin panel editing
            AdminAuthService.isAdminCheck = function () {
                scope.find = function () {
                    scope.users = Users.query();
                    console.log(Users.query());
                    console.log(scope.users);
                };

                //if (Users.query.roles() === 'admin') {
                //    return true;
                //}
            };

        }
    }
});
