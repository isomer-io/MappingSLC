'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/v1/users/me').get(users.me);
  app.route('/api/v1/users').put(users.update);
  app.route('/api/v1/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/v1/users/password').post(users.changePassword);
  app.route('/api/v1/users/picture').post(users.changeProfilePicture);

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
