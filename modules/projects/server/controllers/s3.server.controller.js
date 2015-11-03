var cloudinary = require('cloudinary').v2,
    fs = require('fs'),
    keys = require('../../../users/server/config/private/keys.js'),
    path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    Project = mongoose.model('Project');


exports.config = function() {

  cloudinary.config({
    cloud_name: 'heocda0bv',
    api_key: process.env.CLOUDINARY_KEY || keys.cloudinaryKey,
    api_secret: process.env.CLOUDINARY_SECRET || keys.cloudinarySecret
  });
};

/**
 *
 * @param {string} imageUrl
 */
exports.upload = function(imageUrl) {

// File upload (example for promise api)
  cloudinary.uploader.upload(imageUrl, {tags: 'test'})
    .then(function (image) {
      console.log();
      console.log('** File Upload (Promise)');
      console.log('* public_id for the uploaded image is generated by Cloudinary\'s service.');
      console.log('* ' + image.public_id);
      console.log('* ' + image.url);
      console.log('image, yos!!!:\n', image);
    })
    .catch(function (err) {
      console.log();
      console.log('** File Upload (Promise)');
      if (err) {
        console.warn(err);
      }
    });
};


exports.uploadStream = function(imageUrl) {

// Stream upload
  var stream = cloudinary.uploader.upload_stream(function (result) {
    console.log('**** **** Stream Upload ****  ****\nresult result result:\n', result);
  });
  var file_feader = fs.createReadStream(imageUrl).pipe(stream);
};

exports.read = function(imageUrl) {

};


exports.update = function(imageUrl) {

};


exports.delete = function(imageUrl) {

};
