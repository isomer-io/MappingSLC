'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore'),
    mongoosastic = require('mongoosastic');

/**
 *
 * Census Data 2010 Schema
 *
 **/

var CensusDataSchema = new Schema({
    modifiedOn: {
        type: Date
    },
    totalPopulation: {
        type: String,
        es_indexed: true,
        required: '',
        trim: true
    },
    state: {
        type: String,
        es_indexed: true,
        required: '',
        trim: true
    },
    county: {
        type: String,
        es_indexed: true,
        required: '',
        trim: true
    },
    tract: {
        type: String,
        es_indexed: true,
        required: '',
        trim: true
    }
});

// Using Mongoosastic to watch what's going on with the MongoDB server and feeding into Elastic Search
CensusDataSchema.plugin(mongoosastic);

// Add model
var CensusData = mongoose.model('CensusData', CensusDataSchema),
    stream = CensusData.synchronize(),
    count = 0;

stream.on('data', function (err, doc) {
    count++;
});
stream.on('close', function () {
    console.log('indexed ' + count + ' documents!');
});
stream.on('error', function (err) {
    //console.log(err);
});
