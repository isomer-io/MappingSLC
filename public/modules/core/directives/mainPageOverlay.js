/**
 * Created by poetsrock on 3/11/15.
 */

'use strict';

angular.module('core').directive('mainPageOverlay', function() {
    return {
        restrict: 'AE',
        templateUrl:'/modules/core/directives/views/footer-directive.html'
    };
});