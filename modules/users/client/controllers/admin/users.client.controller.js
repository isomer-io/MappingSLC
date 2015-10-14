'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', '$stateParams', 'Users', 'UserData',
  function ($scope, $state, Authentication, $stateParams, Users, UserData) {
    $scope.authentication = Authentication;
      // Find a list of Users
          $scope.find = function() {
            $scope.users = Users.query($scope.query);
          };

      // Find existing User
          $scope.findOne = function() {
            $scope.user = UserData.getUser({
              userId: $stateParams.userId
            });
            console.log('$scope.users: ', $scope.users);
          };

          $scope.init = function() {
            $scope.find();
          };

  }
]);



