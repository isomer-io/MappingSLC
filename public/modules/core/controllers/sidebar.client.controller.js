'use strict';

angular.module('core').controller('SidebarController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.toggleSideBar = true;
        $scope.toggleMainModal = true;
        $scope.showDetails = false;

//        connects to the home client controller to open the modal when 'home' is clicked on the sidebar

        $scope.showHomeView = function() {
            $rootScope.$broadcast('SHOW_HOME');
        };

//        connects to the home client controller to close the modal when the sidebar is opened

        $scope.closeHomeView = function() {
            $rootScope.$broadcast('CLOSE_HOME');
        };

    }
]);