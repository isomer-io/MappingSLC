'use strict';

module.exports = {
	db: 'mongodb://localhost/mapping-salt-lake-city-dev',
	app: {
		title: 'Mapping Salt Lake City - Development Environment'
	},

	var require = function() {

	},

	facebook: {
		clientID: process.env.FACEBOOK_ID || '319019724936363',
		clientSecret: process.env.FACEBOOK_SECRET || '3ebfd75fff26823c6ab3f462c7060af0',
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