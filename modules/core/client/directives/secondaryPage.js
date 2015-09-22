'use strict';

angular.module('core').directive('secondaryPageDirective', function() {
    return {
        restrict: 'AE',
        //replace: true,
        priority: 0,
        templateUrl:'/modules/core/directives/views/secondary-page.html'
    };
});