'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', '$http',
	function($scope, $stateParams, $location, Authentication, Projects, $http) {
		$scope.authentication = Authentication;
		$scope.logo = '../../../modules/core/img/brand/mapping.png';
		//var width = '100%';
		//var height = 'auto';
		var width = '1600';
		var height = '900';
		$scope.street = '547 South 300 East';
		$scope.city = 'Salt Lake City';
		$scope.state = 'UT';
		$scope.zip = 84111;
		$scope.title = 'Title This, Yo!';
		$scope.story = 'You ready?';

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
			});

			$http.get('/keys')
				.success(function(data){

					$http.get('http://geocoder.cit.api.here.com/6.2/geocode.json' +
					'?state=' + project.state +
					'&city=' + project.city +
					'&postalcode=' + project.zip +
					'&street=' + project.street +
					'&gen=8' +
					'&app_id=' + data.hereKey +
					'&app_code=' + data.hereSecret)
						.success(function (data) {
							//console.log('all: ' + data.Response.View.Result.Location.DisplayPosition.Latitude);
							//data = $scope.geoData;
							//console.log('response: ' + $scope.geoData);

							////create static map from lat and long
							////todo -- turn into a directive
							//$scope.mapImage =
							//	'http://api.tiles.mapbox.com/v4/{' +
							//	data.mapboxKey + '/' +
							//	project.geocode.long + ',' +
							//	project.geocode.lat +
							//	',10/' + //set the map zoom: default '10'
							//	width + 'x' + height + '.png?access_token=' +
							//	data.mapboxAccessToken;


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
							console.log(data);
							//var tempData = data;
							//var geoData = tempData | json;
							console.log('response: ' + data.Response.View[0]);
							//project.geocode.long = data['Response']['View']['Result']['Location'];  .Result[2].Location.DisplayPosition.Latitude

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