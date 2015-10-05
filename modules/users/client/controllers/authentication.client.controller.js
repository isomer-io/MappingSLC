'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', '$modal',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator, $modal) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/v1/auth/signup', $scope.credentials)
        .success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/v1/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };

    $scope.goToSignUp = function ($state) {
      $state.go('signup');
    };


    // Reroutes from sign in to sign up on modal
    $scope.modalOpenSignUp = function () {
      var isSwitched = false;
      $modal.open({
        templateUrl: function () {
          if (!isSwitched) {
            isSwitched = false;
            return 'modules/users/client/views/authentication/signup.client.view.html';

          } else {
            return 'modules/users/client/views/authentication/signin.client.view.html';

          }
        },
        size: 'lg',
        backdropClass: 'sign-in-modal-background',
        windowClass: 'sign-in-modal-background',
        backdrop: false,
        controller: function ($scope) {

        }

      }).then(function () {

        console.log('Success!!!!!');
      });
    };

  }
]);
