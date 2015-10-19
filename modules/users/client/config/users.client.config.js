'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ])
  }
])


/**
    // todo Lightbox

    // set a custom template
    LightboxProvider.templateUrl = '/modules/users/client/directives/views/lightbox.html';

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

 **/


.config(function (LightboxProvider) {

  //set a custom template
  LightboxProvider.templateUrl = '/modules/users/client/views/lightbox.html';

//// set the caption of each image as its text color
//  LightboxProvider.getImageCaption = function (imageUrl) {
//    return '#' + imageUrl.match(/00\/(\w+)/)[1];
//  };

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
      'width': width,                             // default
      'height': 'auto'                            // custom
    };
  };

});
