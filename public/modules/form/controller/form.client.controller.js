'use strict';

angular.module('signupwiz-form').controller('formController', ['$scope', '$location',
    function($scope, $location) {

        // Create new User Account
        $scope.createAccount = function() {

            // Create new User Account object
            var signupForm = new SignupForms ({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                businessName: this.businessName,
                street: this.street,
                zip: this.zip
            });

            // Redirect to mothership after save
            signupForm.$save(function() {
                $location.path('api/user');

                // Clear form fields
                $scope.email = '';
                $scope.firstName = '';
                $scope.lastName = '';
                $scope.businessName = '';
                $scope.street = '';
                $scope.zip = '';

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;

            });
        };


        //show submit button when all required fields are true; otherwise, show which fields need to be filled out
        $scope.completed = function() {
            var signupField;
            for (signupField in $scope.formData) {
                if ($scope.formData === null) {
                    return $scope.completed = false;
                } else {
                    $scope.completed = true;
                }
            }
        };


        // function to process the form

        //$scope.creatAccount = function() {
        //    $http.post('/api/user');
        //    alert('Thanks! Now, let\'s get started!');
        //};

    }

]);