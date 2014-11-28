'use strict';

//Setting up route
angular.module('signupwiz-form').config(['$stateProvider',
    function($stateProvider) {

        $stateProvider
            // route to show basic form (/form)

            .state('signupwiz', {
                url: '/signupwiz',
                templateUrl: 'modules/form/views/signupwiz-client.view.html',
                controller: 'formController'
            })

            // nested states
            // each of these sections will have their own view
            // url will be nested (/form/form1)
            .state('signupwiz.page1', {
                url: '/signupwiz1',
                templateUrl: 'modules/form/views/signupwiz-page1-client.view.html'
            })

            // url will be /form/form2
            .state('signupwiz.page2', {
                url: '/signupwiz2',
                templateUrl: 'modules/form/views/signupwiz-page2-client.view.html'
            })

            // url will be /form/form3
            .state('signupwiz.page3', {
                url: '/signupwiz3',
                templateUrl: 'modules/form/views/signupwiz-page3-client.view.html'
            });

    }

]);