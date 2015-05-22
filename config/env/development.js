'use strict';

var apiKeys = require('../../app/models/data/private/keys.js');

//module.exports = {
//	db: 'mongodb://localhost/mapping-salt-lake-city-dev',
//	app: {
//		title: 'Mapping Salt Lake City - Development Environment'
//	},


module.exports = {
	db: {
		//uri: 'mongodb://localhost/mean-dev',
		//uri: 'mongodb://localhost/mapping-salt-lake-city-dev',
		uri: 'mongodb://localhost/mapping-slc-dev',
		options: {
			user: '',
			pass: ''
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	app: {
		title: 'Mapping Salt Lake City - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || apiKeys.facebookKey,
		clientSecret: process.env.FACEBOOK_SECRET || apiKeys.facebookSecret,
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || apiKeys.twitterKey,
		clientSecret: process.env.TWITTER_SECRET || apiKeys.twitterSecret,
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || apiKeys.googleKey,
		clientSecret: process.env.GOOGLE_SECRET || apiKeys.googleSecret,
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || apiKeys.linkedInKey,
		clientSecret: process.env.LINKEDIN_SECRET || apiKeys.linkedInSecret,
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
