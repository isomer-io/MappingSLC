'use strict';

angular.module('core').controller('ModalController', ['$scope', 'AuthenticationService','$modal','$location','$http',
    function($scope, AuthenticationService,$modal,$location,$http) {
        $scope.authentication = AuthenticationService;



    }
]);