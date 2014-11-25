'use strict';

//Setting up route
angular.module('signup-form').config(['$stateProvider',
    function($stateProvider) {

        $stateProvider.
            // route to show basic form (/form)

            state('signupForm', {
                url: '/form',
                templateUrl: 'modules/form/views/form-0-client.view.html'
            }).

            // nested states
            // each of these sections will have their own view
            // url will be nested (/form/form1)
            state('signupForm.page1', {
                url: '/form1',
                templateUrl: 'modules/form/views/form-1-client.view.html'
            }).

            // url will be /form/form2
            state('signupForm.page2', {
                url: '/form2',
                templateUrl: 'modules/form/views/form-2-client.view.html'
            }).

            // url will be /form/form3
            state('signupForm.page3', {
                url: '/form3',
                templateUrl: 'modules/form/views/form-3-client.view.html'
            });

    }

]);