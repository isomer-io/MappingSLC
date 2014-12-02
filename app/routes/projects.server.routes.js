'use strict';

module.exports = function(app) {

    var users = require('../../app/controllers/users.server.controller');
    var projects = require('../../app/controllers/projects.server.controller');

    // Projects Routes
    app.route('/projects')
        .get(projects.list)
        .post(users.requiresLogin, projects.create);

    app.route('/projects/:projectId')
        .get(projects.read)
        .put(users.requiresLogin, projects.hasAuthorization, projects.update)
        .delete(users.requiresLogin, projects.hasAuthorization, projects.delete);

    // Finish by binding the Project middleware
    app.param('projectId', projects.deleteByID);


    var keys = require('../../config/env/mapKeys.js');

        // Maps Routes
            app.route('/mapKeys')
        .get(function(req, res) {
                res.jsonp(keys);
        });
    //
    //var projectObj = require('../models/project.server.model.js');
    //
    //// Maps Routes
    //app.route('/projectObj')
    //    .get(function(req, res) {
    //        res.jsonp(projectObj);
    //    });
};