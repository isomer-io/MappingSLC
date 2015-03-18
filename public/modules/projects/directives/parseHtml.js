'use strict';
angular.module('projects').directive('parseHtml', function () {
    return {
        restrict: 'E',
        //priority: 10,
        scope: {},
        //transclude:true,
        template: '<div data-ng-bind-html="{{storyStyled}}"></div><br><div data-ng-bind-html="storyStyled"></div>',
        controller: function ($scope, $sce) {

            $scope.storyStyled = '';

            var storyStyled = $scope.story;
            $scope.storyStyled = $sce.trustAsHtml(storyStyled);
        }
    }
});