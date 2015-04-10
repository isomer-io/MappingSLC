'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CensusData = mongoose.model('CensusData');

/**
 * Globals
 */
var user, censusData;

/**
 * Unit tests
 */
describe('Census data Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			censusData = new CensusData({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return censusData.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		CensusData.remove().exec();
		User.remove().exec();

		done();
	});
});