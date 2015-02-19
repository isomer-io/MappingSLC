/**
* Created by poetsrock on 11/18/14.
*/

'use strict';

module.exports = function(app) {
    var keys = require('../../config/env/keys.js'),
        request = require('request');

    // Maps Routes
    app.route('/keys')
        .get(function(req, res) {
                res.jsonp(keys);
            });

    app.route('/places')
        .get(function(req, res) {
            request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBZ63pS3QFjYlXuaNwPUTvcYdM-SGRmeJ0&location=40.773,-111.902&radius=1000',
                function (error, response, body) {
                    res.jsonp(JSON.parse(body));
                });
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
