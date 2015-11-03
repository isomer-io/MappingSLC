'use strict';

angular.module('users').controller('UserController', ['$scope', '$state', '$stateParams', 'Authentication', 'UserData', 'Users',
  function ($scope, $state, $stateParams, Authentication, UserData, Users) {
    $scope.authentication = Authentication;
    $scope.user = Authentication.user;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };


    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      //probably need to create new User instance before being able to use `user.$update()`
      //also need to better understand `$state.go()`
      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
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
      console.log('$scope.users: ', $scope.users);
    };

  }
]);
