'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider', 'LightboxProvider',
	function ($httpProvider, LightboxProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'AuthenticationService',
			function ($q, $location, AuthenticationService) {
				return {
					responseError: function (rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								AuthenticationService.user = null;
								//console.log('401');

								// Redirect to signin page
								$location.path('signin');
								//console.log('403');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);


		// Lightbox

		// set a custom template
		LightboxProvider.templateUrl = '/modules/users/directives/views/lightbox.html';

		// our images array is not in the default format, so we have to write this
		// custom method
		LightboxProvider.getImageUrl = function (imageUrl) {
			return imageUrl;
		};

		// set the caption of each image as its text color
		LightboxProvider.getImageCaption = function (imageUrl) {
			return '#' + imageUrl.match(/00\/(\w+)/)[1];
		};

		// increase the maximum display height of the image
		LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
			return {
				'maxWidth': dimensions.windowWidth >= 768 ? // default
				dimensions.windowWidth - 92 :
				dimensions.windowWidth - 52,
				'maxHeight': 1600                           // custom
			};
		};

		// the modal height calculation has to be changed since our custom template is
		// taller than the default template
		LightboxProvider.calculateModalDimensions = function (dimensions) {
			var width = Math.max(400, dimensions.imageDisplayWidth + 32);

			if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
				width = 'auto';
			}

			return {
				'width': width,    // default
				'height': 'auto'   // custom
			};
		};


	}
]);