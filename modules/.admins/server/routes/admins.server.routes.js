'use strict';

/**
 * Module dependencies.
 */
var adminsPolicy = require('../policies/admins.server.policy'),
    admins = require('../controllers/admins.server.controller');

module.exports = function (app) {
  // admins collection routes
  app.route('/api/v1/admins').all(adminsPolicy.isAllowed)
    .get(admins.list)
    .post(admins.create);

  // Single admin routes
  app.route('/api/v1/admins/:adminId').all(adminsPolicy.isAllowed)
    .get(admins.read)
    .put(admins.update)
    .delete(admins.delete);

  // Finish by binding the admin middleware
  app.param('adminId', admins.adminByID);

};
