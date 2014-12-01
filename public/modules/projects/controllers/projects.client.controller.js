'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', '$http',
	function($scope, $stateParams, $location, Authentication, Projects, $http) {
		$scope.authentication = Authentication;

		// Create new Project
		$scope.create = function() {
			// Create new Project object
			var project = new Projects ({
				firstname: this.firstname,
				lastname: this.lastname,
				email: this.email,
				story: this.story,
				street: this.street,
				zip: this.zip,
				title: this.title
			});

			// Redirect after save
			project.$save(function(response) {
				$location.path('projects/' + response._id);

				// Clear form fields
				$scope.firstname = '';
				$scope.lastname = '';
				$scope.email = '';
				$scope.story = '';
				$scope.street= '';
				$scope.zip='';
				$scope.title='';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Project
		$scope.remove = function(project) {
			if ( project ) {
				project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
					$location.path('projects');
				});
			}
		};

		// Update existing Project
		$scope.update = function() {
			var project = $scope.project;

			project.$update(function() {
				$location.path('projects/' + project._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Projects
		$scope.find = function() {
			$scope.projects = Projects.query();
		};

		// Find existing Project
		$scope.findOne = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};

		$scope.editorOptions = {
			language: 'en',
			uiColor: '#000000'
		};

		// geocode from street and zip code field -- this is a test
		// eventually this will be moved into a service and will be config'ed
		// to store the result on the Db assoicated with the project sub --
		// function will be called after successful project submission

		$http.get('/mapKeys')
			.success(function(data){
				geocode(data.mapboxKey, data.mapboxAccessToken);
			})
			.error(function(data, status){
				alert('Failed to load Mapbox API key. Status: ' + status);
			});

		$scope.street = '454 3rd Ave';
		$scope.zip = '84103';


		$scope.geocode = function(street, zip, accessToken) {
			$http.get('http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/' + street + ' ' + zip + '.json?access_token=' + accessToken)
			//$http.get('http://api.tiles.mapbox.com/v4/geocode/mapbox.places-postcode-v1/20001.json?access_token=pk.eyJ1IjoicG9ldHNyb2NrIiwiYSI6Imc1b245cjAifQ.vwb579x58Ma-CcnfQNamiw')
				.success(function (data) {
					console.log(data);
				})
				.error(function (data, status) {
					console.log(data, status);
				});
		};
	}
]);