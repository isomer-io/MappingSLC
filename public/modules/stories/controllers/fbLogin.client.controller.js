/**
 * Created by chris on 8/20/14.
 */
'use strict';

// Adds logic for Facebook OAuth button
angular.module('stories').controller('FbLoginController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=319019724936363&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }
]);