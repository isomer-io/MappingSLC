'use strict';

// AuthenticationService service for user variables
angular.module('users').service('profilePicService', ['$window', '$scope',
	function($window, $scope) {

		//var profileDefault = $window.user.userSelectedImageURL,
		//	facebook = $window.user.additionalProvidersData.facebook.picture.data.url,
		//	twitter  = $window.user.additionalProvidersData.twitter.profile_image_url,
		//	local = $window.user.profileImageURL;
		//
		//$scope.profilePic = {
		//	noPic: '<span class="profile-pic fa fa-user" />'
		//};
		//$scope.profilePicDisplayed = null;
		//$scope.profilePicArray = [];

		this.getProfilePic = function (profilePicToArray) {

			var profileDefault = $window.user.userSelectedImageURL,
				facebook = $window.user.additionalProvidersData.facebook.picture.data.url,
				twitter  = $window.user.additionalProvidersData.twitter.profile_image_url,
				local = $window.user.profileImageURL;

			$scope.profilePic = {
				noPic: '<span class="profile-pic fa fa-user" />'
			};
			$scope.profilePicDisplayed = null;
			$scope.profilePicArray = [];

					console.log('profilePic obj: ', $scope.profilePic);
			if (profileDefault !== '' && profileDefault !== undefined && profileDefault !== null) {
				$scope.profilePic.profileDefault = profileDefault;
				$scope.profilePicDisplayed = profileDefault;
			} else {
				if (facebook) {
					$scope.profilePic.facebook = facebook;
					$scope.profilePicArray.push(facebook);
					$scope.profilePicDisplayed = facebook;
				}
				if (twitter) {
					$scope.profilePic.twitter = twitter;
					$scope.profilePicArray.push(twitter);
					$scope.profilePicDisplayed = twitter;
				}
				if (local) {
					$scope.profilePic.local = local;
					$scope.profilePicArray.push(local);
					$scope.profilePicDisplayed = local;
				} else {
					$scope.profilePicDisplayed = noPic;
				}
			}
			if (profilePicToArray === true) {
				console.log('$scope.profilePicArray: ', $scope.profilePicArray);
				return $scope.profilePicArray;
			}
			console.log('$scope.profilePicDisplayed: ', $scope.profilePicDisplayed);
			return $scope.profilePicDisplayed;
		}
	}
]);
