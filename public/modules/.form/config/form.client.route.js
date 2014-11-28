'use strict';

//Setting up route
angular.module('signupwiz-form').config(['$stateProvider',
    function($stateProvider) {

        $stateProvider
            // route to show basic form (/form)

            .state('signupwiz', {
                url: '/form',
                templateUrl: 'modules/form/views/signupwiz-page0-client.view.html'
            })

            // nested states
            // each of these sections will have their own view
            // url will be nested (/form/form1)
            .state('signupwiz.page1', {
                url: '/page1',
                templateUrl: 'modules/form/views/signupwiz-page1-client.view.html'
            })

            // url will be /form/form2
            .state('signupwiz.page2', {
                url: '/page2',
                templateUrl: 'modules/form/views/signupwiz-page2-client.view.html'
            })

            // url will be /form/form3
            .state('signupwiz.page3', {
                url: '/page3',
                templateUrl: 'modules/form/views/signupwiz-page3-client.view.html'
            });

            //.state('signupwizForm', {
            //    url: '/form',
            //    templateUrl: 'modules/form/views/form-0-client.view.html'
            //})
            //
            //// nested states
            //// each of these sections will have their own view
            //// url will be nested (/form/form1)
            //.state('signupwizForm.page1', {
            //    url: '/form1',
            //    templateUrl: 'modules/form/views/form-1-client.view.html'
            //})
            //
            //// url will be /form/form2
            //.state('signupwizForm.page2', {
            //    url: '/form2',
            //    templateUrl: 'modules/form/views/form-2-client.view.html'
            //})
            //
            //// url will be /form/form3
            //.state('signupwizForm.page3', {
            //    url: '/form3',
            //    templateUrl: 'modules/form/views/form-3-client.view.html'
            //});

    }

]);