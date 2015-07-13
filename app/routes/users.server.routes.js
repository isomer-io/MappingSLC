'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	//express static for image assests in 'uploads' folder
	//app.use('/media', app.static('uploads'));

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/contributors').get(users.contributors);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	//app.route('/users/profile-pic')
	//	.get(users.getProfilePic);

	// Users Routes for Admin Panel
	app.route('/users')
		.get(users.isAdmin, users.list);
	app.route('/admin/users/schema')
		.get(users.isAdmin, users.getSchema);
	app.route('/users/:userId')
		.get(users.read)
		.put(users.isAdmin, users.update)
		.delete(users.isAdmin, users.delete);
	app.route('/admin/users')
		.get(users.isAdmin, users.list)
		.post(users.isAdmin, users.create);
	app.route('/admin/list-users')
		.get(users.isAdmin, users.list);
	app.route('/uploads/users/:userId')
		.get(users.profileImage);


	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// Setting the github oauth routes
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
