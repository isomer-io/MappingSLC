'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore');

/**
 *
 * Map Schema
 *
 **/

var MapSchema = new Schema({
    googlePlacesApi: {
        type: Array,
        default: ''
    }

});

mongoose.model('Map', MapSchema);