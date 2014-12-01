'use strict';

module.exports = function(app) {
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
