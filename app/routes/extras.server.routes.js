'use strict';

module.exports = function (app) {
    var keys = require('../../config/env/keys.js'),
        tractData = require ('../../config/env/utahTract.json'),
        request = require('request');

    // Maps Routes
    app.route('/keys')
        .get(function (req, res) {
            res.jsonp(keys);
        });

    // Maps Routes
    app.route('/tractData')
        .get(function (req, res) {
            res.jsonp(tractData);
        });

    app.route('/places')
        .get(function (req, res) {
            //var pageToken = '';
            var query = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBZ63pS3QFjYlXuaNwPUTvcYdM-SGRmeJ0&location=40.773,-111.902&radius=1000';
            request(query,
                function (error, response, body) {
                    body = JSON.parse(body);
                    res.jsonp(body);
                    var pageToken = body['next_page_token'];


                    var secondQuery = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + pageToken + '&key=AIzaSyBZ63pS3QFjYlXuaNwPUTvcYdM-SGRmeJ0';
                    console.log(secondQuery);
                    request(secondQuery, function(error, response, body) {
                        console.log(body);
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

};