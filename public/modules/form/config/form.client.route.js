'use strict';

//Setting up route
angular.module('project-submission').config(['$stateProvider',
    function($stateProvider) {

        $stateProvider
            // route to show basic form (/form)

            .state('project-submit-wiz', {
                url: '/project-submit-wiz',
                templateUrl: 'modules/form/views/project-submit-wiz-client.view.html',
                controller: 'formController'
            })

            // nested states
            // each of these sections will have their own view
            // url will be nested (/form/form1)
            .state('project-submit-wiz.page1', {
                url: '/project-submit-wiz1',
                templateUrl: 'modules/form/views/project-submit-wiz-page1-client.view.html'
            })

            // url will be /form/form2
            .state('project-submit-wiz.page2', {
                url: '/project-submit-wiz2',
                templateUrl: 'modules/form/views/project-submit-wiz-page2-client.view.html'
            })

            // url will be /form/form3
            .state('project-submit-wiz.page3', {
                url: '/project-submit-wiz3',
                templateUrl: 'modules/form/views/project-submit-wiz-page3-client.view.html'
            });

    }

]);