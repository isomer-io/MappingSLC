'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('/api/v1/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users').factory('Admin', ['$resource', 'AdminAuthService',
    function ($resource, AdminAuthService) {
      if(AdminAuthService.user === 'admin'){
        return $resource('/api/v1/users/:userId');
      }
    }
]);

angular.module('users').factory('AdminUpdateUser', ['$resource', 'AdminAuthService',
  function ($resource, AdminAuthService) {
    if(AdminAuthService.user === 'admin'){
      return $resource('api/v1/users/:userId', {userId: '@_id'}, {
        update: {
          method: 'PUT'
        }
      }, {
        create: {
          method: 'POST'
        }
      }, {
        read: {
          method: 'GET'
        }
      });
    }
  }
]);
