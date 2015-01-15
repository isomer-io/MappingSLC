'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Projects',
	function($scope, $stateParams, $location, Projects) {

		$scope.formData = {};

		// Create new Project
		$scope.create = function() {

			// Create new Project object
			var project = new Projects({
				firstname: $scope.formData.firstname,
				lastname: $scope.formData.lastname,
				email: $scope.formData.email,
				street: $scope.formData.street,
				city: $scope.formData.city,
				state: $scope.formData.state,
				zip: $scope.formData.zip,
				story: $scope.formData.story,
				title: $scope.formData.title
			});
			project.$save(function(response) {
				$location.path('projects/' + response._id);

				// Clear form fields
				$scope.firstname = '';
				$scope.lastname = '';
				$scope.email = '';
				$scope.street = '';
				$scope.city = '';
				$scope.state = '';
				$scope.zip = '';
				$scope.story = '';
				$scope.title = '';
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

		$scope.completed = function() {
			var formField;
			for (formField in $scope.createProject) {
				if ($scope.createProject === null) {
					return $scope.completed = false;
				} else {
					$scope.completed = true;
				}
			}
		};

	}
]);