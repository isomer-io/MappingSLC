'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var projects = require('../../app/controllers/projects.server.controller');
    var admins = require('../../app/controllers/projects.server.controller');

// Projects Routes
    app.route('/projects')
        .get(projects.list)
        .post(users.requiresLogin, projects.create);

    app.route('/projects/:projectId')
        .get(projects.read)
        .put(users.requiresLogin, projects.hasAuthorization, projects.update)
        .delete(users.requiresLogin, projects.hasAuthorization, projects.delete);

// Project Markers Routes
    app.route('/markerData')
        .get(projects.markerList);

    // Finish by binding the Project middleware
    app.param('projectId', projects.projectByID);

    //app.route('/projects/:markers')
    //    .get(projects.markerList);
    //
    //app.param('markers', projects.markersByGeo);

    //todo finish building out Admin Panel on backend

    /*
    //Admin Routes
    */
    app.route('/admins')
        .get(admins.hasAuthorization, admins.list)
        .post(users.requiresLogin, admins.hasAuthorization, admins.create);

    app.route('/admins/:adminId')
        .get(admins.hasAuthorization, admins.read)
        .put(users.requiresLogin, admins.hasAuthorization, admins.update)
        .delete(users.requiresLogin, admins.hasAuthorization, admins.delete);

    // Finish by binding the Admin middleware
    //app.param('adminId', admins.adminByID);



    // This is the search route, make a GET request on this endpoitn to return search results
    app.route('/search')
        .post(function(req,res){
            Project.search({query:req.body.q}, function(err, results){
                res.send(results);
            });
    });


    //var projectData = require('../models/project.server.model.js');
    //app.route('/projectData')
    //      .get(function(req, res) {
    //          res.jsonp(projectData);
    //          console.log('project D = ' + projectData);
    //      });
    //// Setting up the users api
    //app.route('/projectData')
    //      .put(project.geocode);


    //var projectObj = require('../models/project.server.model.js');
    //
    //// Maps Routes
    //app.route('/projectObj')
    //    .get(function(req, res) {
    //        res.jsonp(projectObj);
    //    });
};