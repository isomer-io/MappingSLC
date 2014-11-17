/**
* Created by poetsrock on 11/16/14.
*/
'use strict';

module.exports = function(app) {
    var keys = require('../../config/env/mapKeys.js');

    // Maps Routes
    app.route('/mapKeys')
        .get(function(req, res) {
            res.jsonp(keys);
        });
};