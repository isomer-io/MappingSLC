'use strict';

module.exports = function (app) {
    var users = require('../../app/controllers/users.server.controller'),
        keys = require('../models/data/private/keys.js') || require('../../config/env/keys.js'),//second options is deprecated, use /models route
        tractData = require('../models/data/utahTract.json'),
        markerData = require('../models/project.server.model.js'),
        request = require('request');

    //Google Places API Call
    app.route('/places')
        .get(function (req, res) {
            //var pageToken = '';
            var results = {};
            var tempResults = [];
            var query = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBZ63pS3QFjYlXuaNwPUTvcYdM-SGRmeJ0&location=40.773,-111.902&radius=1000';
            request(query,
                function (error, response, body) {
                    body = JSON.parse(body);
                    res.jsonp(body);
                    var pageToken = body['next_page_token'];
                    console.log('pageToken: ', pageToken);
                    console.log('body2: ', body);
                    results = body;

                    var secondQuery = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + pageToken + '&key=AIzaSyBZ63pS3QFjYlXuaNwPUTvcYdM-SGRmeJ0';
                    console.log('secondQuery: ', secondQuery);
                    request(secondQuery, function (error, response, body) {
                        console.log('body2: ', body);
                        tempResults = results.push(body);
                        console.log('final results: ', results);
                    });

                });

        });


// API Keys Routes
    app.route('/keys')
        .get(function (req, res) {
            res.jsonp(keys);
        });

// Utah Census Tract Routes
    app.route('/tractData')
        .get(function (req, res) {
            res.jsonp(tractData);
        });
//
//// Project Markers Routes
//    app.route('/markerData')
//        .get(function (req, res) {
//            console.log('res.sessionStore: \n', res.sessionStore);
//            res.jsonp(markerData);
//        });

    //// User Profile Data Routes
    //app.route('/userData')
    //    .get(function (req, res) {
    //        res.jsonp(userData);
    //    });


}
;