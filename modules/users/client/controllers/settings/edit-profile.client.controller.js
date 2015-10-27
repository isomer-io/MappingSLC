'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'UserData', '$stateParams', 'Authentication', 'AdminAuthService', 'UtilsService',
  function ($scope, $http, $location, Users, UserData, $stateParams, Authentication, AdminAuthService, UtilsService) {
    $scope.user = Authentication.user;
    $scope.isAdmin = AdminAuthService;

    // Provides logic for the css in the forms
    UtilsService.cssLayout();



    // Update a user profile
    $scope.updateCurrentUser = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }
      console.log('here');
      var userToEditId = $stateParams.userId;
      var user = AdminUpdateUser(userToEditId);
      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };

    // Update a user profile
    $scope.updateUserAdmin = function(isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        //var user = new Users($scope.userToEdit);
        var user = new Users({
          userId: $stateParams.userId
        });
        user.$update(function(response) {
          $scope.success = true;
          //$scope.user = Authentication.user = response;
        }, function(response) {
          $scope.error = response.data.message;
          console.log('$scope.error = response.data.message');
        });
      } else {
        $scope.submitted = true;
      }
    };


    // Update existing User
    //$scope.updateUserAdmin = function (isValid) {
    //
    //  if (!isValid || $scope.isAdmin.user !== 'admin') {
    //    $scope.$broadcast('show-errors-check-validity', 'userForm');
    //    return false;
    //  }
    //
    //  var user = $scope.user;
    //
    //  user.$update(function () {
    //    $location.path('users/' + user._id);
    //  }, function (errorResponse) {
    //    $scope.error = errorResponse.data.message;
    //  });
    //};

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
      console.log('$stateParams.userId', $stateParams.userId);
      $scope.userToEdit = UserData.get({
        userId: $stateParams.userId
      });
      console.log('$scope.userToEdit: ', $scope.userToEdit);
    };


  }
]);
