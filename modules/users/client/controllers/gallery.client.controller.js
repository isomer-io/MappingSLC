'use strict';

// Projects controller
angular.module('users').controller('GalleryController', ['$scope', '$stateParams', '$location', 'Authentication', '$http', '$modal',
    function ($scope, $stateParams, $location, Authentication, $http, $modal) {

        //Give user warning if leaving form
        var preventRunning = false;
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (preventRunning) {
                return;
            }
            if (fromState.url === '/projects/create' && toState.url !== '/projects/:projectId') {
                event.preventDefault();

                $modal.open({
                    templateUrl: '/modules/projects/directives/views/modal.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.closeMe = function () {
                            $modalInstance.dismiss(function (reason) {
                                console.log(reason);
                            });
                        };
                        $scope.leave = function () {
                            preventRunning = true;
                            $scope.closeMe();
                            $location.path(toState);
                        };
                    },
                    size: 'lg'
                });
            }

        });



    }
]);
