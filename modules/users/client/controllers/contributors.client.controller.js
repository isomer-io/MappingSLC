'use strict';


angular.module('users').controller('ContributorController', ['$scope', '$animate', '$location', 'Authentication', 'GetContributors', '$stateParams', '$http', '$modal', '$window', 'Lightbox',
    function ($scope, $animate, $location, Authentication, GetContributors, $stateParams, $http, $modal, $window, Lightbox) {

        $scope.init = function() {
            GetContributors.contributors();
        };

        $scope.contributors = null;
        GetContributors.contributors()
        .success(function(contributorsData){
            console.log('contributorsData.profileImageURL: ', contributorsData.profileImageURL);
            console.log('contributorsData: ', contributorsData);
            $scope.contributors = contributorsData;
        }).
            error(function(errorData){
                console.log('errorData: ', errorData);
            });


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

        /**
         * Contributors' Page
         **/

        $scope.slides = [

            {
                image: 'http://placeimg.com/640/480/people',
                text: 'I am some words, a story even. Play Ball!'
            },
            {
                image: 'http://lorempixel.com/640/480/people',
                text: 'A story even. Peoples'
            },
            {
                image: 'http://lorempixel.com/640/480/fashion',
                text: 'Story time! Anything!'
            },
            {
                image: 'http://fillmurray.com/640/480',
                text: 'Talk to me! Foodie'
            }

        ];

        /**
         * Lightbox
         */
    $scope.Lightbox = Lightbox;

    $scope.images = [
        'http://dummyimage.com/100x100/8ac4f6/ffffff.png',
        'http://dummyimage.com/200x200/29ed98/ffffff.png',
        'http://dummyimage.com/300x300/c47ee9/ffffff.png',
        'http://dummyimage.com/400x400/716e5c/ffffff.png',
        'http://dummyimage.com/500x500/b37752/ffffff.png',
        'http://dummyimage.com/600x600/20b7ea/ffffff.png',
        'http://dummyimage.com/700x700/586163/ffffff.png',
        'http://dummyimage.com/800x800/6ce0dd/ffffff.png',
        'http://dummyimage.com/900x900/79841e/ffffff.png',
        'http://dummyimage.com/1000x1000/c55f33/ffffff.png',
        'http://dummyimage.com/1100x1100/43e03d/ffffff.png',
        'http://dummyimage.com/1200x1200/ee82f/ffffff.png',
        'http://dummyimage.com/1300x1300/10d5d3/ffffff.png',
        'http://dummyimage.com/1400x1400/77ddbf/ffffff.png',
        'http://dummyimage.com/1500x1500/ba6ef4/ffffff.png',
        'http://dummyimage.com/1600x1600/471916/ffffff.png'
    ];

    }

]);
