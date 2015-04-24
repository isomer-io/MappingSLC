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
 * Census Data Child Schema
 *
 **/

var CensusDataChildSchema = new Schema ({

    state: {
        type: String,
        es_indexed: true,
        default: '49',
        required: '',
        trim: true
    },
    county: {
        type: String,
        es_indexed: true,
        default: '035',
        required: '',
        trim: true
    },
    tract: {
        type: String,
        es_indexed: true,
        required: '',
        trim: true
    },
    reportType: {
        type: [{
            type: String,
            enum: ['sf1', 'acs1', 'acs3', 'acs5']
        }],
        es_indexed: true,
        trim: true
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'contributor', 'admin', 'superUser']
        }],
        default: ['user']
    },
    reportYear: {
        type: Number,
        es_indexed: true,
        trim: true
    }
});


/**
 *
 * Census Data Parent Schema
 *
 **/

var CensusDataSchema = new Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    censusDataVariable: {
        type: String,
        es_indexed: true,
        required: '',
        unique: true,
        trim: true
    },
    other: {
        type: String,
        es_indexed: true,
        trim: true
    }
});

// Using Mongoosastic to watch what's going on with the MongoDB server and feeding into Elastic Search
CensusDataSchema.plugin(mongoosastic);

// Add model
var CensusData = mongoose.model('CensusDataSchema', CensusDataSchema),
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
