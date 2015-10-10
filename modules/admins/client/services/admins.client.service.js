'use strict';

//Admins service used for communicating with the articles REST endpoints
angular.module('admins').factory('Admins', ['$resource',
  function ($resource) {
    return $resource('api/admins/:adminId', {
      adminId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
