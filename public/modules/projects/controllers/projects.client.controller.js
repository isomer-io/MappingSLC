'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', 'ngAutocomplete',
	function($scope, $stateParams, $location, Authentication, Projects) {
		$scope.authentication = Authentication;
		console.log(ngAutocomplete);
		// Create new Project
		$scope.create = function() {
			// Create new Project object
			var project = new Projects ({
				firstname: this.firstname,
				lastname: this.lastname,
				email: this.email,
				story: this.story,
				address: this.address
			});

			// Redirect after save
			project.$save(function(response) {
				$location.path('projects/' + response._id);

				// Clear form fields
				$scope.firstname = '';
				$scope.lastname = '';
				$scope.email = '';
				$scope.story = '';
				$scope.address= '';
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

		$scope.result1 = '';
		$scope.options1 = null;
		$scope.details1 = '';

	}
]);