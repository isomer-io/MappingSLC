'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'AuthenticationService', 'UserData', '$stateParams', '$window',
	function($scope, $http, $location, Users, AuthenticationService, UserData, $stateParams, $window) {
		$scope.user = AuthenticationService.user;
		$scope.userRole = null;
		$scope.userZip = null;
		$scope.toggleEdit = false;
		$scope.toggleId = 0;
		$scope.toggleEditFn = function(editNum) {
			$scope.toggleEdit = !$scope.toggle;
			$scope.toggleId = editNum;
		};

		//var profilePic = {
		//	profileDefault: $window.user.userSelectedImageURL,
		//	facebook: $window.user.additionalProvidersData.facebook.picture.data.url,
		//	twitter: $window.user.additionalProvidersData.twitter.profile_image_url,
		//	local: $window.user.profileImageURL,
		//	noPic: '<span class="profile-pic fa fa-user" />'
		//};
		//$scope.profilePicDisplayed = null;
		//$scope.profilePicArray = [];
		//
		//
		//$scope.getProfilePic = function (profilePicToArray) {
		//	console.log('profilePic obj: ', profilePic);
		//	console.log('$window.user.default: ', $window.user.userSelectedImageURL);
		//	console.log('$window.user facebook: ', $window.user.additionalProvidersData.facebook.picture.data.url);
		//	console.log('$window.user twitter: ', $window.user.additionalProvidersData.twitter.profile_image_url);
		//	console.log('$window.user.local: ', $window.user.profileImageURL);
		//	if (profilePic.profileDefault !== '' && profilePic.profileDefault !== undefined && profilePic.profileDefault !== null) {
		//		$scope.profilePicDisplayed = profilePic.profileDefault;
		//	} else {
		//		if (profilePic.facebook) {
		//			$scope.profilePicArray.push(profilePic.facebook);
		//			$scope.profilePicDisplayed = profilePic.facebook;
		//		}
		//		if (profilePic.twitter) {
		//			$scope.profilePicArray.push(profilePic.twitter);
		//			$scope.profilePicDisplayed = profilePic.twitter;
		//		}
		//		if (profilePic.local) {
		//			$scope.profilePicArray.push(profilePic.local);
		//			$scope.profilePicDisplayed = profilePic.local;
		//		} else {
		//			$scope.profilePicDisplayed = profilePic.noPic;
		//		}
		//	}
		//	if (profilePicToArray === true) {
		//		console.log('$scope.profilePicArray: ', $scope.profilePicArray);
		//		return $scope.profilePicArray;
		//	}
		//	console.log('$scope.profilePicDisplayed: ', $scope.profilePicDisplayed);
		//	return $scope.profilePicDisplayed;
		//};
		//
		////$scope.profilePic = profilePicService.getProfilePic();
		//$scope.returnProfilePic = $scope.getProfilePic();
		////$scope.profilePicArray = profilePicService.getProfilePic(true);
		//$scope.returnProfilePicArray = $scope.getProfilePic(true);




		$scope.photo0 = 'chris--bw-2.jpg';


		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

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
		// from above, $scope.user = AuthenticationService.user;
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
				console.log('front end user', user);

				user.$update(function(response) {
					console.log('front end $update response', response);
					$scope.success = true;
					AuthenticationService.user = response;
				}, function(response) {
					$scope.error = response.data.message;
					console.log('$scope.error = response.data.message')
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

		// Find existing User
		$scope.findOne = function() {
			$scope.user = UserData.get({
				userId: $stateParams.userId
			});
		};

	}
]);