'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    CensusData = mongoose.model('CensusData'),
    _ = require('lodash'),
    request = require('request');

/**
 * Create a Census Data
 */
exports.create = function(req, res) {
    var censusData = new CensusData(req.body);
    censusData.user = req.user;

    censusData.save(function(err) {
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
 * Show the current Census Data
 */
exports.read = function(req, res) {
    res.jsonp(req.censusData);
};

/**
 * Update a Census Data
 */
exports.update = function(req, res) {
    var censusData = req.censusData ;
    
    censusData = _.extend(censusData , req.body);
    
    censusData.save(function(err) {
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
exports.delete = function(req, res) {
    var censusData = req.censusData;
    
    censusData.remove(function(err) {
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
exports.list = function(req, res) {
    CensusData.find().sort('-created').populate('user', 'displayName').exec(function(err, censusDatas) {
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
exports.censusDataByID = function(req, res, next, id) {
    CensusData.findById(id).populate('user', 'displayName').exec(function(err, censusData) {
        if (err) return next(err);
        if (! censusData) return next(new Error('Failed to load Census Data ' + id));
        req.censusData = censusData ;
        next();
    });
};

/**
 * Census Data authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.censusData.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
