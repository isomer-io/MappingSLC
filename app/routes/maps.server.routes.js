/**
* Created by poetsrock on 11/18/14.
*/

'use strict';

module.exports = function(app) {
    var keys = require('../../config/env/keys.js');
    var utahGeoJson = require('../../config/env/utahTract.json');

    // Maps Routes
    app.route('/keys')
    .get(function(req, res) {
            res.jsonp(keys);
    });

    // Route for Utah TractGeoJSON Data
    app.route('/tractGeoJson')
    .get(function(req, res) {
        res.jsonp(tractGeoJson);
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
