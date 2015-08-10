'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    app = express(),
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    connectMongo = require('connect-mongo'),
    request = require('request'),
    CensusData = mongoose.model('CensusDataSchema'),
    census = require('../models/data/private/keys.js') || require('../../config/env/production.js');
    //census = require('./../models/data/private/keys.js');
/**
 * Create a Record in the Census Data Model
 */
//create a function that receive http request from front end front end function will pass the following 3 arguments:
//censusDataVariable (e.g., 'P0010001'); censusYear (e.g., 2000, 2010, 2011, 2012, 2013, 2014); censusType (e.g., 'sf1', 'acs')
//this back end function will, first, check against the json objects and models to ensure there is no error in the requested data and that the data exists.
exports.create = function (req, res, census) {
//    if (!req.params.name) {
//        res.status('400').jsonp('Bad request')
//    } else {
//
//// If no errors, then it will check to see if the data exists locally in a model.
//        app.get('/', function (req, res) {  //turn this into a get request from the database?  or, if not that, find out how to query the database
//            res.send('GET request to homepage');
//        });
//
//// if so, it returns the data.
//
//
//// if not, it makes a call to census api


    //pretend front end request will pass in the following params, in order for me to run and test this

    var censusDataVariable = ['P0010001'],
        censusYear = [1990, 2000, 2010, 2011, 2012, 2013, 2014],
        censusType = ['sf1', 'acs'];

    var query = 'http://api.census.gov/data/' + censusYear[1] + '/' + censusType[0] + '?get=' + censusDataVariable[0] + '&for=tract:*&in=state:49+county:035&key=' + census.key;
    request(query,
        function (error, response, body) {
            console.log('censusData response.body: ', response.body);
            console.log('censusData body: ', body);

            //var censusData = new CensusData(req.body);
            //censusData.user = req.user;
//
////after returning new data from census api, save the census data locally
//            censusData.save(function (err) {
//                if (err) {
//                    return res.status(400).send({
//                        message: errorHandler.getErrorMessage(err)
//                    });
//                } else {
//                    res.jsonp(censusData);
//                }
//            });
        });
    //}
};



////example code from the Mongoose docs
////source: http://mongoosejs.com/docs/populate.html
//
//var Schema = mongoose.Schema;
//
//var personSchema = Schema({
//    _id     : Number,
//    name    : String,
//    age     : Number,
//    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
//});
//
//var storySchema = Schema({
//    _creator : { type: Number, ref: 'Person' },
//    title    : String,
//    fans     : [{ type: Number, ref: 'Person' }]
//});
//
//var Story  = mongoose.model('Story', storySchema);
//var Person = mongoose.model('Person', personSchema);
//
//CensusDataSchema
//    .find({ _creator: aaron._id })
//    .exec(function (err, stories) {
//        if (err) return handleError(err);
//        console.log('The stories are an array: ', stories);
//    });
////end of sample code






/**
 * Show the current Census Data
 */
exports.read = function (req, res) {
    res.jsonp(req.censusData);
};

/**
 * Update a Census Data
 */
exports.update = function (req, res) {
    var censusData = req.censusData;
    
    censusData = _.extend(censusData, req.body);
    
    censusData.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(censusData);
        }
    });
};

/**
 * Delete an Census Data
 */
exports.delete = function (req, res) {
    var censusData = req.censusData;
    
    censusData.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(censusData);
        }
    });
};

/**
 * List of Census Data Points
 */
exports.censusFindList = function (req, res) {
    //run a query in mongoose
    //Model.find(query) to return an array of instances matching the query
    CensusData.find()
        .sort('-created')
        .populate('censusDataVariable', 'tract', 'reportType', 'reportYear')
        .exec(function (err, censusDatas) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(censusDatas);
            }
        });
};

/**
 * Census Data middleware
 */
exports.censusDataByID = function (req, res, next, id) {
    //Model.findById(ObjectID) to return a single instance matching the given ObjectID
    CensusData.findById(id)
        .populate('censusDataVariable', 'tract', 'reportType', 'reportYear')
        .exec(function (err, censusData) {
            if (err) return next(err);
            if (!censusData) return next(new Error('Failed to load Census Data ' + id));
            req.censusData = censusData;
            next();
        });
};

/**
 * Census Data middleware that checks
 */
exports.censusLocalStoreCheck = function (req, res, next, id) {
    CensusData.findOne({});
    //Model.findOne(query) to return the first instance found that matches the query
    query = CensusData.findOne({'censusDataVariable': censusDataVariable});
    //.populate('censusDataVariable', 'tract', 'reportType', 'reportYear')
    query.exec(function (err, censusData) {
        if (err) {
            console.log(err);
            return next(err)
        }
        if (!censusData) {
            return next(new Error('Error!'))
        }
        req.censusData = censusData;
        next();
    });
};

/**
 * Census Data authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    //if (req.censusData.user.id !== req.user.id) {
    //    return res.status(403).send('User is not authorized');
    //}
    next();
};
