'use strict';

angular.module('core').directive('footerDirective', function() {
    return {
        restrict: 'AE',
        //replace: true,
        priority: 0,
        templateUrl:'/modules/core/client/directives/views/footer-directive.html'
    };
});
