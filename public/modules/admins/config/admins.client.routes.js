/**
 * Created by poetsrock on 11/15/14.
 */
'use strict';

//Setting up route
angular.module('admins').config(['$stateProvider',
    function($stateProvider) {
        // Projects state routing
        $stateProvider.
            state('admin', {
                url: '/admin',
                templateUrl: 'modules/admin/views/admin.client.view.html'
            });
    }

]);