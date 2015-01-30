'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', '$http','MapboxApiKeys','Geocodeapi',
	function($scope, $stateParams, $location, Authentication, Projects, $http,MapboxApiKeys,Geocodeapi) {
		$scope.authentication = Authentication;
		$scope.logo = '../../../modules/core/img/brand/mapping.png';
		var width = '800';
		var height = '350';
		var markerUrl = 'url-http%3A%2F%2Fwww.mappingslc.org%2Fimages%2Fsite_img%2Flogo_marker_150px.png';
		$scope.mapImage = '';

		// Create new Project
		$scope.create = function() {

			// Create new Project object
			var project = new Projects({
				created: this.created,
				createdBy: this.createdBy,
				street: '123 Elm',
				city: 'Salt Lake City',
				state: 'UT',
				zip: '84106',
				title: 'Dumb Title',
				story: ';alksjdf;lkasjdf;lkasj'
			});

            var saveProject = function() {
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

            MapboxApiKeys.getApi().success(function(data) {
                var mapboxKey = data.mapboxKey;
                var mapboxSecret = data.mapboxSecret;
                var hereKey = data.hereKey;
                var hereSecret = data.hereSecret;
                Geocodeapi.callApi(project, hereKey, hereSecret, saveProject)
                    .success(function(data) {
                    project.mapImage = 'http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + markerUrl + '(' + project.lng + ',' + project.lat + ')/' + project.lng + ',' + project.lat + ',13/' + width + 'x' + height + '.png?access_token=' + mapboxSecret;
                    saveProject();
                })
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