'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'UserData', '$stateParams', 'Authentication', 'UtilsService',
  function ($scope, $http, $location, Users, UserData, $stateParams, Authentication, UtilsService) {
    $scope.currentUser = Authentication.user;
    console.log('Authentication.users: ', Authentication.user);
    //$scope.user;

    // Provides logic for the css in the forms
    UtilsService.cssLayout();

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }
      console.log('here');
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');
        $scope.success = true;
        Authentication.user = response;
        console.log('here 2 w response', response);
      }, function (response) {
        console.log('here 3 w response', response);
        $scope.error = response.data.message;
        console.log('error!\n', $scope.error);
      });
    };

    //admin panel functions

    $scope.toggleEdit = false;
    $scope.toggleId = 0;

    $scope.toggleEditFn = function(editNum) {
      $scope.toggleEdit = !$scope.toggle;
      $scope.toggleId = editNum;
    };

    //runs a query to return user ID for admin panel editing
    $scope.find = function () {
      $scope.users = Users.query();
    };

    // Find a list of Users
    $scope.find = function() {
      $scope.users = Users.query($scope.query);
    };

    // Find existing User
    $scope.findOne = function() {
      $scope.user = UserData.get({
        userId: $stateParams.userId
      });
      console.log('$scope.users: ', $scope.user);
    };


  }
]);
