'use strict';

angular.module('core').directive('mainPageOverlay', function() {
    return {
        restrict: 'AE',
        priority: 10,
        templateUrl:'/modules/core/directives/views/main-page-overlay.html'
    };
});