'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/v1/users')
    .get(adminPolicy.isAllowed, admin.list);

  // Single user routes
  app.route('/api/v1/users/:userId')
    //.get(adminPolicy.isAllowed, admin.read)
    .get(admin.read)
    .put(admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

  // Contributors collection routes
  app.route('/api/v1/contributors')
    //.get(adminPolicy.isAllowed, admin.getContributors);
    .get(admin.getContributors);

  // Single contributor routes
  app.route('/api/v1/contributors/:userId')
    .get(adminPolicy.isAllowed, admin.getContributorByID)
    .delete(adminPolicy.isAllowed, admin.deleteContributor);


  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
};
