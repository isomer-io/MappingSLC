'use strict';

// Admins controller
angular.module('admins').controller('AdminsController', ['$scope', '$stateParams', '$location', 'AuthenticationService', 'Admins', 'Projects', 'UsersService',
    function($scope, $stateParams, $location, AuthenticationService, Admins, Projects, UsersService) {
        $scope.authentication = AuthenticationService;

        // If user is not an administrator then redirect back home
        if (!$scope.admin) $location.path('/');


        //// Create new Admin
        //$scope.create = function() {
        //    // Create new Admin object
        //    var admin = new Admins ({
        //        firstname: this.firstname,
        //        lastname: this.lastname,
        //        email: this.email,
        //        story: this.story,
        //        address: this.address
        //    });
        //
        //    // Redirect after save
        //    admin.$save(function(response) {
        //        $location.path('admins/' + response._id);
        //
        //        // Clear form fields
        //        $scope.firstname = '';
        //        $scope.lastname = '';
        //        $scope.email = '';
        //        $scope.story = '';
        //        $scope.address= '';
        //    }, function(errorResponse) {
        //        $scope.error = errorResponse.data.message;
        //    });
        //};
        //
        //// Remove existing Admin
        //$scope.remove = function(admin) {
        //    if ( admin ) {
        //        admin.$remove();
        //
        //        for (var i in $scope.admins) {
        //            if ($scope.admins [i] === admin) {
        //                $scope.admins.splice(i, 1);
        //            }
        //        }
        //    } else {
        //        $scope.admin.$remove(function() {
        //            $location.path('admins');
        //        });
        //    }
        //};
        //
        //// Update existing Admin
        //$scope.update = function() {
        //    var admin = $scope.admin;
        //
        //    admin.$update(function() {
        //        $location.path('admins/' + admin._id);
        //    }, function(errorResponse) {
        //        $scope.error = errorResponse.data.message;
        //    });
        //};
        //
        //// Find a list of Admins
        //$scope.find = function() {
        //    $scope.admins = Admins.query();
        //};
        //
        //// Find existing Admin
        //$scope.findOne = function() {
        //    $scope.admin = Admins.get({
        //        adminId: $stateParams.adminId
        //    });
        //};


        /**
         *
         * Projects Admin Functions
         *
         **/

        // Remove existing Project
        $scope.remove = function (project) {
            if (project) {
                project.$remove();

                for (var i in $scope.projects) {
                    if ($scope.projects [i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            } else {
                $scope.project.$remove(function () {
                    $location.path('projects');
                });
            }
        };

        // Update existing Project
        $scope.update = function () {
            var project = $scope.project;

            project.$update(function () {
                $location.path('projects/' + project._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Projects
        $scope.find = function () {
            $scope.projects = Projects.query();
        };

        // Find existing Project
        $scope.findOne = function () {
            $scope.project = Projects.get({
                projectId: $stateParams.projectId
            });
        };



        /**
         *
         * Users Admin Functions
         *
         **/


            // Update a user profile
        $scope.updateUserProfile = function() {
            $scope.success = $scope.error = null;
            var user = new UsersService($scope.user);

            user.$update(function(response) {
                $scope.success = true;
                AuthenticationService.user = response;
            }, function(response) {
                $scope.error = response.data.message;
            });
        };


        // Check if there are additional accounts
        $scope.hasConnectedAdditionalSocialAccounts = function(provider) {
            for (var i in $scope.user.additionalProvidersData) {
                return true;
            }

            return false;
        };

        // Check if provider is already in use with current user
        $scope.isConnectedSocialAccount = function(provider) {
            return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
        };

    }
]);