'use strict';

module.exports = function (app) {
    var users = require('../../app/controllers/users.server.controller'),
        censusDatas = require('../controllers/census-data.server.controller.js'),
        keys = require('../models/data/private/keys.js') || require('../../config/env/keys.js'),
        tractData = require('../models/data/utahTract.json'),
        markerData = require('../models/data/projectMarkers.json'),
        request = require('request');

    var census2010Results = [];


// BEGINNING OF 2010 Census Data Routes
    app.route('/census-data')
        .get(function (req, res) {
            var query = 'http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316';
            request(query,
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        body = JSON.parse(body);
                        res.jsonp(body);
                        census2010Results = body;
                        console.log('Success! Response & Body', response, body);
                    }else{
                        console.log('ERROR! Error, response & body', error, response, body);
                    }
                }
            )
        });
        //.post(users.requiresLogin, censusDatas.create);

    app.route('/censusDatas/:censusDataId')
        .get(censusDatas.read)
        .put(users.requiresLogin, censusDatas.hasAuthorization, censusDatas.update)
        .delete(users.requiresLogin, censusDatas.hasAuthorization, censusDatas.delete);

    // Finish by binding the Project middleware
    app.param('censusDataId', censusDatas.censusDataByID);
// END OF 2010 Census Data Routes

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


                    //request('https://www.google.com',
                    //    function (error, response, body) {
                    //    //body = JSON.parse(body);
                    //    //res.jsonp(body);
                    //    console.log(body);
                    //});


                    //return pageToken;
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

    // Project Markers Routes
    app.route('/markerData')
        .get(function (req, res) {
            res.jsonp(markerData);
        });


};