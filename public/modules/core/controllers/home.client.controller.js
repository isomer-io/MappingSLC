'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
    function ($scope, Authentication, $http) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        //toggles off/on for main overlay page and menu
        $scope.toggle = true;
        $scope.count = {};
        $scope.featuredProjects = {};

        //placeholder for featured projects images
        //todo once admin module is built, create a function that makes photo1 and 2 dynamic rather than hard-coded

        $scope.photo1 = 'as_thumb.png';
        $scope.photo2 = 'wli_thumb.png';
        $scope.photo3 = 'dw_thumb.png';


    }
]);