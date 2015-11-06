'use strict';

//Admins service used for communicating with the articles REST endpoints
angular.module('admins').factory('Admins', ['$resource',
  function ($resource) {
    return $resource('api/v1/admins/:adminId', {
      adminId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
