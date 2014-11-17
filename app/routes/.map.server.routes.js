/**
* Created by poetsrock on 11/16/14.
*/
'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var projects = require('../controllers/.maps.server.controller.js');
    //var error = require('./errors.server.controller');

    // Projects Routes
    app.route('/maps')
        .get(maps.list)
        .post(users.requiresLogin, maps.create);

    app.route('/maps/:mapId')
        .get(maps.read)
        .put(users.requiresLogin, maps.hasAuthorization, maps.update)
        .delete(users.requiresLogin, maps.hasAuthorization, maps.delete);

    // Finish by binding the Project middleware
    app.param('mapId', maps.mapByID);
};