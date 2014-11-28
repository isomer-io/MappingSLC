'use strict';

angular.module('project-submission').controller('formController', ['$scope', '$location',
    function($scope, $location) {

        // Create new User Account
        $scope.createProject = function() {

            // Create new User Account object
            var projectSubmit = new ProjectSubmits ({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                projectTitle: this.projectTitle,
                projectStreet: this.projectStreet,
                projectZip: this.projectZip,
                projectSubmission: this.projectSubmission //projectSubmission is the field where the project itself will be stored
            });

            // Redirect to mothership after save
            projectSubmit.$save(function() {
                $location.path('api/user');

                // Clear form fields
                $scope.email = '';
                $scope.firstName = '';
                $scope.lastName = '';
                $scope.projectTitle = '';
                $scope.projectStreet = '';
                $scope.projectZip = '';
                $scope.projectSubmission = '';

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;

            });
        };


        //$scope.completed = true when all required fields are true, and form will display submit button; otherwise, show which fields need to be filled out
        $scope.completed = function() {
            var formField;
            for (formField in $scope.createProject) {
                if ($scope.createProject === null) {
                    return $scope.completed = false;
                } else {
                    $scope.completed = true;
                }
            }
        };

    }

]);