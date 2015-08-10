'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length >= 8));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	namePrefix: {
		type: String,
		trim: true,
		default: ''
	},
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	userTitle: {
		type: String,
		trim: true,
		default: ''
	},
	displayName: {
		type: String,
		trim: true
	},
	userStreet: {
		type: String,
		default: '',
		trim: true
	},
	userCity: {
		type: String,
		default: '',
		trim: true
	},
	userState: {
		type: String,
		default: '',
		trim: true
	},
	userZip: {
		type: Number,
		default: '',
		trim: true
	},
	email: {
		type: String,
		unique: 'This e-mail address is already registered.',
		trim: true,
		default: '',
		required: '',
		validate: [validateLocalStrategyProperty, 'Please enter your e-mail, and make sure you have not already signed up with this e-mail.'],
		match: [/.+\@.+\..+/, 'That doesn\'t look like an e-mail address to us. Please make sure you\'re using a valid e-mail address.']
	},
	username: {
		type: String,
		unique: 'Username already exists',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password must be at least 8 characters']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {

	},
	additionalProvidersData: {

	},
	roles: {
		type: [{
			type: String,
			enum: ['blocked', 'unregistered', 'registered', 'contributor', 'admin', 'superUser']
		}],
		default: ['admin']
	},
	updated: {
		type: Date,
		default: Date.now
	},
	created: {
		type: Date,
		default: Date.now
	},
	lastVisit: {
		type: Date,
		default: Date.now
	},
	//this field will store info about users browsing history and preferences
	browseHistory: {
		type: Object,
		default: {}
	},
	favorites: {
		type: String,
		trim: true,
		default: ''
	},
	newsletter: {
		type: Boolean,
		default: false
	},
	profileImageURL: {
		type: String,
		trim: true,
		default: ''
	},
	userSelectedImageURL: {
		type: String,
		trim: true,
		default: ''
	},
	associatedProjects: {
		type: String,
		trim: true,
		default: ''
	},
	bio: {
		type: String,
		default: '',
		trim: true
	}
});


//create virtual attribute for full name
UserSchema.virtual('fullName').get(function () {
	return this.firstName + ' ' + this.lastName;
});

//create virtual attribute for full name
UserSchema.virtual('localProfilePic').get(function () {
	return this.profileImageURL + ' ' + this.id;
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);