'use strict';

var apiKeys = require('./keys.js');
console.log(apiKeys);

module.exports = {
	db: 'mongodb://localhost/mapping-salt-lake-city-dev',
	app: {
		title: 'Mapping Salt Lake City - Development Environment'
	},

	facebook: {
		clientID: process.env.FACEBOOK_ID || 'apiKeys.facebookKey',
		clientSecret: process.env.FACEBOOK_SECRET || 'apiKeys.facebookSecret',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'twitterKey',
		clientSecret: process.env.TWITTER_SECRET || 'twitterSecret',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'googleKey',
		clientSecret: process.env.GOOGLE_SECRET || 'googleSecret',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'linkedInKey',
		clientSecret: process.env.LINKEDIN_SECRET || 'linkedInSecret',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};