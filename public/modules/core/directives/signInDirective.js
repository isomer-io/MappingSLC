/**
* Created by poetsrock on 3/11/15.
*/

'use strict';

angular.module('core').directive('signInDirective', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/core/directives/views/sign-in-directive.html'
        };
    });