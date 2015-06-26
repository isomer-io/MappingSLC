'use strict';

angular.module('users').controller('AuthenticationServiceController', ['$scope', '$http', '$location', 'AuthenticationService', '$modal', '$state', 'Users', 'UserData', '$rootScope',
	function ($scope, $http, $location, AuthenticationService, $modal, $state, Users, UserData, $rootScope) {
		$scope.authentication = AuthenticationService;
		$scope.toggleSignup = false;

		//$rootScope.signInBeforeProject = true;

		$scope.signInBeforeProject = $rootScope.signInBeforeProject;
		$scope.closeWarning = false;


		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');


		$scope.signup = function () {
			$http.post('/auth/signup', $scope.credentials).success(function (response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// redirect to the project create page if $rootScope.signInBeforeProject = true
				if ($rootScope.signInBeforeProject = true) {
					$rootScope.signInBeforeProject = false;
					$location.path('/projects/create');
				} else {
					// And redirect to the index page
					$location.path('/');
				}
			}).error(function (response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function () {
			console.log('$scope.credentials: ', $scope.credentials);
			$http.post('/auth/signin', $scope.credentials)

				.success(function (response) {
					console.log('response: ', response);
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;
					//todo add function to update lastVisited property in user db model
					// redirect to the project create page if $rootScope.signInBeforeProject = true
					if ($rootScope.signInBeforeProject === true) {
						$rootScope.signInBeforeProject = false;
						$location.path('/projects/create');
					} else {
						// And redirect to the index page
						$location.path('/');
					}
				})
				.error(function (response) {
					console.log('auth.client.controller error ln 30', response);
					$scope.error = response.message;
				})
		};
		//	//once logged in, update lastVisited property
		//.then(function (response) {
		//	$scope.success = $scope.error = null;
		//
		//	var user = new Users($scope.user);
		//	console.log('front end user', user);
		//
		//	user.$update(function (response) {
		//		console.log('front end $update response', response);
		//		$scope.success = true;
		//		AuthenticationService.user = response;
		//	}, function (response) {
		//		$scope.error = response.data.message;
		//		console.log('$scope.error = response.data.message: ', response.data.message)
		//	});

		//// And redirect to the index page
		//$location.path('/');
		//})
		//};

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
						return '/modules/users/views/signup.client.view.html';

					} else {
						return '/modules/users/views/signin.client.view.html';
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

		var cssLayout = function () {
			[].slice.call(document.querySelectorAll('input.input_field')).forEach(function (inputEl) {
				// in case the input is already filled..
				if (inputEl.value.trim() !== '') {
					classie.add(inputEl.parentNode, 'input-filled');
				}

				// events:
				inputEl.addEventListener('focus', onInputFocus);
				inputEl.addEventListener('blur', onInputBlur);
			});

			function onInputFocus(ev) {
				classie.add(ev.target.parentNode, 'input-filled');
			}

			function onInputBlur(ev) {
				if (ev.target.value.trim() === '') {
					classie.remove(ev.target.parentNode, 'input-filled');
				}
			}
		};
		cssLayout();

	}
]);