'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    troop = require('mongoose-troop'),
    validator = require('validator'),
    _ = require('underscore'),
    mongoosastic = require('mongoosastic');

/**
 *
 * Project Schema
 * (also used for Admin panel)
 *
 **/

var ProjectSchema = new Schema({
    status: {
        type: Array,
        default: 'Pending'
    },
    createdOn: {
        type: Date
    },
    modifiedOn: {
        type: Date
    },
    createdBy: {
        type: String,
        default: ''
        //todo test function that auto-generates current user to make sure it works
        //default: (function(currentUser){
        //	this.Schema.user = currentUser;
        //})
    },
    modifiedBy: {
        type: String,
        default: ''
        //todo test function that auto-generates current user to make sure it works
        //default: (function(currentUser){
        //	this.Schema.user = currentUser;
        //})
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    street: {
        type: String,
        default: '',
        required: '',
        trim: true
    },
    city: {
        type: String,
        default: '',
        trim: true
    },
    state: {
        type: String,
        default: '',
        trim: true
    },
    zip: {
        type: Number,
        default: '',
        required: '',
        trim: true
    },
    title: {
        type: String,
        es_indexed: true,
        default: '',
        required: 'Please fill out the title of your submission',
        trim: true
    },
    story: {
        type: String,
        es_indexed: true,
        default: 'Enter and format your project here',
        required: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    lat: {
        type: Number,
        default: '',
        trim: true
    },
    lng: {
        type: Number,
        default: '',
        trim: true
    },

    //stores a static map image, created on new project creation
    //calls from mapbox web services static map image:
    //https://www.mapbox.com/developers/api/static/#images
    mapImage: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: Array,
        default: '',
        trim: true
    },
    featured: {
        type: Boolean,
        default: 'false'
    },
    thumbnail: {
        type: String,
        default: '',
        trim: true
    },
    imageGallery: {
        type: Array,
        default: '',
        trim: true
    },
    bio: {
        type: String,
        default: '',
        trim: true
    },
    videoId: {
        type: Array,
        default: '',
        trim: true
    },
    soundId: {
    type: Array,
    default: '',
    trim: true
    }
});

// Adds a created and modified property to the schema, updating the timestamps as expected
ProjectSchema.plugin(troop.timestamp);

// Using Mongoosastic to watch what's going on with the MongoDB server and feeding into Elastic Search
ProjectSchema.plugin(mongoosastic);

// Add model

var Project = mongoose.model('Project', ProjectSchema),
    stream = Project.synchronize(),
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

