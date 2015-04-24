'use strict';

// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contacts', 'formlyVersion',
	function($scope, $stateParams, $location, Authentication, Contacts, formlyVersion) {
		$scope.authentication = Authentication;

		var vm = this;
		// funcation assignment
		vm.onSubmit = onSubmit;

		// variable assignment
		vm.author = {
			name: 'Chris',
			url: 'https://twitter.com/tanzmainia'
		};
		vm.exampleTitle = 'ngModelAttrs';
		vm.env = {
			angularVersion: angular.version.full,
			formlyVersion: formlyVersion
		};

		vm.model = {};

		vm.fields = [
				{
					"type": "multiField",
					"templateOptions": {
						"fields": [
							{
								"type": "input",
								"key": "firstName",
								"templateOptions": {
									"label": "First Name"
								}
							},
							{
								"type": "input",
								"key": "lastName",
								"templateOptions": {
									"label": "Last Name"
								},
								"expressionProperties": {
									"templateOptions.disabled": "!model.firstName"
								}
							}
						]
					}
				},
				{
					"template": "<hr /><div><strong>Address:</strong></div>"
				},
				{
					"type": "multiField",
					"templateOptions": {
						"fields": [
							{
								"type": "input",
								"key": "street",
								"templateOptions": {
									"label": "Street",
									"width": 6
								}
							},
							{
								"type": "input",
								"key": "cityName",
								"templateOptions": {
									"label": "City",
									"width": 3
								}
							},
							{
								"type": "input",
								"key": "zip",
								"templateOptions": {
									"type": "number",
									"label": "Zip",
									"max": 99999,
									"min": 0,
									"pattern": "\\d{5}",
									"width": 3
								}
							}
						]
					}
				},
				{
					"template": "<hr />"
				},
				{
					"type": "input",
					"key": "otherInput",
					"templateOptions": {
						"label": "Other Input"
					}
				},
				{
					"type": "checkbox",
					"key": "otherToo",
					"templateOptions": {
						"label": "Other Checkbox"
					}
				}

		];

		vm.originalFields = angular.copy(vm.fields);

		// function definition
		function onSubmit() {
			alert(JSON.stringify(vm.model), null, 2);
		}


		// Create new Contact
		$scope.create = function() {
			// Create new Contact object
			var contact = new Contacts ({
				name: this.name
			});

			// Redirect after save
			contact.$save(function(response) {
				$location.path('contacts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contact
		$scope.remove = function(contact) {
			if ( contact ) { 
				contact.$remove();

				for (var i in $scope.contacts) {
					if ($scope.contacts [i] === contact) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {
					$location.path('contacts');
				});
			}
		};

		// Update existing Contact
		$scope.update = function() {
			var contact = $scope.contact;

			contact.$update(function() {
				$location.path('contacts/' + contact._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contacts
		$scope.find = function() {
			$scope.contacts = Contacts.query();
		};

		// Find existing Contact
		$scope.findOne = function() {
			$scope.contact = Contacts.get({ 
				contactId: $stateParams.contactId
			});
		};
	}
]);

angular.module('contacts').directive('customAttr', function() {
	return function(scope, el, attrs) {
		attrs.$observe('customAttr', function() {
			console.log('customAttr: ' + attrs.customAttr);
		});
	}
});

angular.module('contacts').directive('customBoundAttr', function() {
	return function(scope, el, attrs) {
		scope.$watch(attrs.customBoundAttr, function() {
			console.log('customBoundAttr: ' + scope.$eval(attrs.customBoundAttr));
		});
	}
});

angular.module('contacts').directive('customExpression', function() {
	return {
		restrict: 'A',
		scope: {
			customExpression: '&'
		},
		link: function(scope, el) {
			el.on('click', function() {
				scope.customExpression();
				scope.$apply();
			});
		}
	};
});
