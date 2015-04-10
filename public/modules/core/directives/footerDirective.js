/**
* Created by poetsrock on 3/11/15.
*/

'use strict';

angular.module('core').directive('footerDirective', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl:'/modules/core/directives/views/footer-directive.html'
    };
});