'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication','$modal',
	function($scope, $http, $location, Authentication,$modal) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;
                   //$modalInstance.close();
				//And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;
               // $modalInstance.close();

				//And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Reroutes from sign in to sign up on modal

		$scope.modalOpenSignUp = function(){

			$modal.open({
				templateUrl:'/modules/users/views/signup.client.view.html',
				size:'lg',
				backdropClass:'sign-in-modal-background',
				windowClass: 'sign-in-modal-background',
				backdrop:false

			}).then(function(){

                console.log('Success!!!!!');
            });
            };




	}
]);