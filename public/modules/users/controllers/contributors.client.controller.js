'use strict';


angular.module('users').controller('ContribController', ['$scope', '$animate', '$location', 'AuthenticationService',
    function ($scope, $animate, $location) {

        //fix for carousel
        $animate.enabled(false);

        $scope.myInterval = 5000;
        $scope.slides = [

            {
                image: 'http://lorempixel.com/600/400/sports',
                text: 'I am some words, a story even. Play Ball!'
            },
            {
                image: 'http://lorempixel.com/600/400/people',
                text: 'A story even. Peoples'
            },
            {
                image: 'http://lorempixel.com/600/400/',
                text: 'Story time! Anything!'
            },
            {
                image: 'http://lorempixel.com/600/400/food',
                text: 'Talk to me! Foodie'
            }

        ];

        $scope.changeView = function (view) {
            $location.path(view);
        };

    }

]);
