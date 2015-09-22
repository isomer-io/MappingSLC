'use strict';

//Setting up route
angular.module('contacts').config(['$stateProvider',
    function ($stateProvider) {
        // Contacts state routing
        $stateProvider.
            state('createContact', {
                //url: '/contacts/create',
                url: '/contact-us',
                templateUrl: 'modules/contacts/views/contact-us.client.view.html'
            })
            .state('editContact', {
                url: '/contacts/:contactId/edit',
                templateUrl: 'modules/contacts/views/edit-contact.client.view.html'
            })
            //.state('adminViewMessage', {
            //    url: '/admin/messages/:contactId',
            //    templateUrl: 'modules/admins/views/messages/admin-view-message.client.view.html'
            //})
            .state('aboutUs', {
                url: '/about',
                templateUrl: 'modules/contacts/views/about-us.client.view.html'
            })
        ;
    }
]);