/**
* Created by poetsrock on 3/11/15.
*/

'use strict';

angular.module('core').directive('featuredProjects', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/core/directives/views/featured-projects.html'
        };
    });