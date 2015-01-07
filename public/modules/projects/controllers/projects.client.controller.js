'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', '$http',
	function($scope, $stateParams, $location, Authentication, Projects, $http) {
		$scope.authentication = Authentication;
		$scope.logo = '../../../modules/core/img/brand/mapping.png';
		var width = '800';
		var height = '350';

		$scope.mapImage = '';

		// Create new Project
		$scope.create = function() {

			// Create new Project object
			var project = new Projects({
				created: this.created,
				createdBy: this.createdBy,
				street: this.street,
				city: this.city,
				state: this.state,
				zip: this.zip,
				title: this.title,
				story: this.story
				//lat: this.lat,
				//lng: this.lng

			});

			//back-end request to get mapbox and here api access
			$http.get('/keys')
				.success(function(data){
					var mapboxKey = data.mapboxKey;
					var mapboxSecret = data.mapboxSecret;

					//from submitted project's address fields, return lng. and lat. coordinates
					$http.get('http://geocoder.cit.api.here.com/6.2/geocode.json' +
					'?state=' + project.state +
					'&city=' + project.city +
					'&postalcode=' + project.zip +
					'&street=' + project.street +
					'&gen=8' +
					'&app_id=' + data.hereKey +
					'&app_code=' + data.hereSecret)
						.success(function (geoData) {
							project.lat = geoData.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
							project.lng = geoData.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
							project.mapImage = 'http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + project.lng + ',' + project.lat + ',13/' + width + 'x' + height + '.png?access_token=' + mapboxSecret;
							//save lat & lng to backend
					console.log('http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + project.lng + ',' + project.lat + ',13/' + width + 'x' + height + '.png?access_token=' + mapboxSecret);
					$scope.mapImage = 'http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + project.lng + ',' + project.lat + ',13/' + width + 'x' + height + '.png?access_token=' + mapboxSecret;

					//create static map image from mapbox api to use as background in layout on project view template
					//$scope.mapImage =
					//	'http://api.tiles.mapbox.com/v4/' +
					//	mapboxKey + '/' +
					//	project.lng + ',' +
					//	project.lat +
					//	',13/' + //set the map zoom: default '13'
					//	width + 'x' + height + '.png?access_token=' +
					//	mapboxSecret;

							//Redirect after save
							project.$save(function(response) {
								$location.path('projects/' + response._id);

								// Clear form fields
								$scope.street = '';
								$scope.city = '';
								$scope.state = '';
								$scope.zip= '';
								$scope.title= '';
								$scope.story = '';
							}, function(errorResponse) {
								$scope.error = errorResponse.data.message;
							});

						})
						.error(function (data, status) {
							console.log(data, status);
						});
				})
				.error(function(data, status){
					alert('Failed to load Here API key. Status: ' + status);
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

	}
]);