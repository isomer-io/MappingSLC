angular.module("NoteWrangler", ['ngRoutes']);
angular.module('NoteWrangler').config(function($routeProvider){});

'use strict';

angular.module('users').directive('signupModal', ['$modal', '$http', '$location', '$rootScope',
    function ($modal, $http, $location, $rootScope) {
        return {
            restrict: 'E',


            link: function postLink(scope, element, attrs) {

                // Fires every time url changes to test for conditions
                scope.$on('$locationChangeStart', function () {

                    $http.get('http://localhost:3000/users/me').success(function (data) {

                        if (data === 'null'&& $location.path() === '/projects/create') {

                            var isSignUpModal = false;
                            var modalView = $modal.open({

                                templateUrl: function () {
                                    if (!isSignUpModal) {
                                        isSignUpModal = !isSignUpModal;
                                        return '/modules/users/views/signin.client.view.html';
                                    } else {
                                        //isSignUpModal = !isSignUpModal;
                                        return '/modules/users/views/signup.client.view.html';
                                    }
                                },
                                size: 'lg',
                                backdropClass: 'sign-in-modal-background',
                                windowClass: 'sign-in-modal-background',
                                backdrop: false,
                                keyboard: false,
                                controller: function ($scope, $modalInstance, $modal) {
                                    $scope.closeModal = function () {

                                        $modalInstance.close();
                                    };

                                    $scope.$on('$stateChangeStart', function () {
                                        $modalInstance.close();
                                    });

                                }

                            });

                            modalView.result.then(function () {
                            }, function () {

                            });

                        }

                    });

                });

            }
        };
    }
]);

