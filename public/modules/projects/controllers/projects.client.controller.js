'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', '$http','ApiKeys','GeoCodeApi','$modal', '$rootScope',
	function($scope, $stateParams, $location, Authentication, Projects, $http, ApiKeys, GeoCodeApi, $modal) {
		$scope.authentication = Authentication;
		$scope.logo = '../../../modules/core/img/brand/mapping.png';
		var width = '800';
		var height = '350';
		var markerUrl = 'url-http%3A%2F%2Fwww.mappingslc.org%2Fimages%2Fsite_img%2Flogo_marker_150px.png';
		$scope.mapImage = '';

        //Give user warning if leaving form

        var preventRunning = false;
           $scope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
               if (preventRunning) {
                   return;
               }
               if(fromState.url === '/2') {
                   event.preventDefault();

                   $modal.open({
                       templateUrl:'/modules/projects/directives/views/modal.html',
                       controller:function($scope, $modalInstance){
                           $scope.closeMe = function(){
                               $modalInstance.dismiss(function(reason){
                                   console.log(reason);
                               });
                           };
                           $scope.leave = function(){
                               preventRunning = true;
                               $scope.closeMe();
                               $location.path(toState);
                           };
                       },
                       size:'sm'
                   });
               }

                });
		// Create new Project
		$scope.create = function() {

			// Create new Project object
			var project = new Projects({
				created: this.created,
				createdBy: this.createdBy,
				street: '',
				city: '',
				state: '',
				zip: '',
				title: '',
				story: ''
			});

            var saveProject = function() {
                project.$save(function(response) {
                    $location.path('projects/' + response._id);
                    // Clear form fields


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

            ApiKeys.getApiKeys().success(function(data) {
                var mapboxKey = data.mapboxKey;
                var mapboxSecret = data.mapboxSecret;
                var hereKey = data.hereKey;
                var hereSecret = data.hereSecret;
                Geocodeapi.callGeoCodeApi(project, hereKey, hereSecret, saveProject)
                    .success(function(data) {
                    project.mapImage = 'http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + markerUrl + '(' + project.lng + ',' + project.lat + ')/' + project.lng + ',' + project.lat + ',13/' + width + 'x' + height + '.png?access_token=' + mapboxSecret;
                    saveProject();
                });
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