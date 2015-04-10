'use strict';

angular.module('core').controller('MenuController', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
        $rootScope.toggleSideBar = true;
        //$scope.toggleSideBar = null;
        $rootScope.toggleMainModal = true;
        $scope.showDetails = false;

        //connects to the home client controller to open the main homepage-like modal
        //     when the 'home' link is clicked on the sidebar menu
        $scope.showHomeView = function() {
            if($location.path() === '/'){
                $rootScope.$broadcast('SHOW_HOME');
            }else{
                $location.path('/');
            }
        };

        //connects to the home client controller to close the modal when the sidebar is opened
        $scope.closeHomeView = function() {
            $rootScope.$broadcast('CLOSE_HOME');
        };

    }
]);