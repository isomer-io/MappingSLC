'use strict';

(function() {
	// Emails Controller Spec
	describe('Emails Controller Tests', function() {
		// Initialize global variables
		var EmailsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Emails controller.
			EmailsController = $controller('EmailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Email object fetched from XHR', inject(function(Emails) {
			// Create sample Email using the Emails service
			var sampleEmail = new Emails({
				name: 'New Email'
			});

			// Create a sample Emails array that includes the new Email
			var sampleEmails = [sampleEmail];

			// Set GET response
			$httpBackend.expectGET('emails').respond(sampleEmails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.emails).toEqualData(sampleEmails);
		}));

		it('$scope.findOne() should create an array with one Email object fetched from XHR using a emailId URL parameter', inject(function(Emails) {
			// Define a sample Email object
			var sampleEmail = new Emails({
				name: 'New Email'
			});

			// Set the URL parameter
			$stateParams.emailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/emails\/([0-9a-fA-F]{24})$/).respond(sampleEmail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.email).toEqualData(sampleEmail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Emails) {
			// Create a sample Email object
			var sampleEmailPostData = new Emails({
				name: 'New Email'
			});

			// Create a sample Email response
			var sampleEmailResponse = new Emails({
				_id: '525cf20451979dea2c000001',
				name: 'New Email'
			});

			// Fixture mock form input values
			scope.name = 'New Email';

			// Set POST response
			$httpBackend.expectPOST('emails', sampleEmailPostData).respond(sampleEmailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Email was created
			expect($location.path()).toBe('/emails/' + sampleEmailResponse._id);
		}));

		it('$scope.update() should update a valid Email', inject(function(Emails) {
			// Define a sample Email put data
			var sampleEmailPutData = new Emails({
				_id: '525cf20451979dea2c000001',
				name: 'New Email'
			});

			// Mock Email in scope
			scope.email = sampleEmailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/emails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/emails/' + sampleEmailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid emailId and remove the Email from the scope', inject(function(Emails) {
			// Create new Email object
			var sampleEmail = new Emails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Emails array and include the Email
			scope.emails = [sampleEmail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/emails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEmail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.emails.length).toBe(0);
		}));
	});
}());