'use strict';

angular.module('core').controller('SidebarController', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
        $rootScope.toggleSideBar = true;
        //$scope.toggleSideBar = null;
        $rootScope.toggleMainModal = true;
        $scope.showDetails = false;

//        connects to the home client controller to open the modal when 'home' is clicked on the sidebar

        $scope.showHomeView = function() {
            if($location.path() === '/'){
                console.log('this be da path!');
                $rootScope.$broadcast('SHOW_HOME');
            }else{
                $location.path('/');
            }
        };

//        connects to the home client controller to close the modal when the sidebar is opened

        $scope.closeHomeView = function() {
            $rootScope.$broadcast('CLOSE_HOME');
        };


        $scope.showSmallLogo = function() {
            $rootScope.$broadcast('SHOW_SMALL_LOGO');
        };


    }
]);