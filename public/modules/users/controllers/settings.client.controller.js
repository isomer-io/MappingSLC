'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'AuthenticationService', 'UserDataService',
	function($scope, $http, $location, Users, AuthenticationService, UserDataService) {
		$scope.user = AuthenticationService.user;
		$scope.userRole = null;
		$scope.userZip = null;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');


		////call on UserData Service to Get Data for Individual User
		//UserDataService.getUserData()
		//	.success(function (userData) {
		//		findOne(userData);
		//	})
		//	.error(function (data, status) {
		//		alert('Failed to load User Data. Status: ' + status);
		//	});



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

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = AuthenticationService.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					AuthenticationService.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
				console.log(UserSchema.schema.path('roles').enumValues);
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};



		//admin panel functions


		// Update existing User
		$scope.update = function () {
			var user = $scope.user;

			user.$update(function () {
				$location.path('users/' + user._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//runs a query to return user ID for admin panel editing
		$scope.find = function () {
			$scope.users = Users.query();
		};

		// Find existing Project
		$scope.findOne = function () {
			$scope.user = Users.get({
				userId: $stateParams.userId
			});

		};



		//subscribe form animations
		var cssLayout = function(){
			[].slice.call( document.querySelectorAll( 'input.input_field' ) ).forEach( function( inputEl ) {
				// in case the input is already filled..
				if( inputEl.value.trim() !== '' ) {
					classie.add( inputEl.parentNode, 'input-filled' );
				}

				// events:
				inputEl.addEventListener( 'focus', onInputFocus );
				inputEl.addEventListener( 'blur', onInputBlur );
			} );

			function onInputFocus( ev ) {
				classie.add( ev.target.parentNode, 'input-filled' );
			}

			function onInputBlur( ev ) {
				if( ev.target.value.trim() === '' ) {
					classie.remove( ev.target.parentNode, 'input-filled' );
				}
			}
		};
		cssLayout();

	}
]);