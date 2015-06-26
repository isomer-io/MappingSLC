'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'AuthenticationService', 'Projects', '$http', '$modal', '$sce', 'ApiKeys', 'GeoCodeApi', '$rootScope', 'AdminAuthService', '$state',
	function ($scope, $stateParams, $location, AuthenticationService, Projects, $http, $modal, $sce, ApiKeys, GeoCodeApi, $rootScope, AdminAuthService, $state) {
		$scope.AuthenticationService = AuthenticationService;
		$scope.isAdmin = AdminAuthService;
		$scope.logo = '../../../modules/core/img/brand/mapping_150w.png';
		var width = '800';
		var height = '250';
		var markerUrl = 'url-http%3A%2F%2Fwww.mappingslc.org%2Fimages%2Fsite_img%2Flogo_marker_150px.png';
		$scope.mapImage = '';
		$rootScope.signInBeforeProject = false;

		$scope.street = '547 S 300 East';
		$scope.city = 'Salt Lake City';
		$scope.state = 'UT';
		$scope.zip = '84111';
		$scope.story = 'This story';
		$scope.title = 'my totally tabular title';

		$scope.trustAsHtml = $sce.trustAsHtml;


		//admin panel editing
		$scope.toggleEdit = false;
		$scope.toggleId = 0;
		$scope.toggleEditFn = function(editNum) {
			$scope.toggleEdit = !$scope.toggle;
			$scope.toggleId = editNum;
		};



		$rootScope.previousState = '';
		$rootScope.currentState = '';
		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
			$rootScope.previousState = from.name;
			$rootScope.currentState = to.name;
		});

		//$scope.goBack = $state.url($rootScope.previousState);

		$scope.run = function ($rootScope, $state, AuthenticationService) {
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				if (toState.authenticate && !AuthenticationService.isLoggedIn()) {

				}
				event.preventDefault();
			});

		};

		$scope.userLoggedin = function () {
			// get request to /users/me
			console.log('TEST111: ', $location.path());
			if ($location.path() === '/projects/create' ) {
				$http.get('http://localhost:3000/users/me').success(function (data) {
					console.log('data: ', data);
					if (data === null) {
						$rootScope.signInBeforeProject = true;
						console.log('proj ctrl: ', $rootScope.signInBeforeProject);
						$location.path('/signin');
					}
				});
			}
		}();

		$scope.slides = [

			{
				image: 'http://lorempixel.com/600/400/sports',
				text: 'I am some words, a story even. Play Ball!'
			},
			{
				image: 'http://lorempixel.com/600/400/people',
				text: 'A story even. Peoples'
			},
			{
				image: 'http://lorempixel.com/600/400/',
				text: 'Story time! Anything!'
			},
			{
				image: 'http://lorempixel.com/600/400/food',
				text: 'Talk to me! Foodie'
			}

		];


		$scope.thumbs = [
			{
				image: 'http://lorempixel.com/100/100/sports',
				text: 'I am some words, a story even. Play Ball!'
			},
			{
				image: 'http://lorempixel.com/100/100/people',
				text: 'A story even. Peoples'
			}
		];

		var mapImage = '';
		// Create new Project
		$scope.create = function () {

			// Create new Project object
			var project = new Projects({
				created: this.created,
				createdBy: this.createdBy,
				street: this.street,
				city: this.city,
				state: this.state,
				zip: this.zip,
				story: this.story,
				title: this.title
		});

			var saveProject = function () {
				project.$save(function (response) {
					$location.path('projects/' + response._id);
					// Clear form fields
					$scope.street = '';
					$scope.city = '';
					$scope.state = '';
					$scope.zip = '';
					$scope.story = '';
					$scope.title = '';
				}, function (errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};

			$http.get('/keys').success(function (data) {
				var mapboxKey = data.mapboxKey;
				var mapboxSecret = data.mapboxSecret;
				var hereKey = data.hereKey;
				var hereSecret = data.hereSecret;

				GeoCodeApi.callGeoCodeApi(project, hereKey, hereSecret, saveProject)
					.success(function (data) {
						project.lat = data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
						project.lng = data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
						project.mapImage = 'http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + markerUrl + '(' + project.lng + ',' + project.lat + ')/' + project.lng + ',' + project.lat + ',15/' + width + 'x' + height + '.png?access_token=' + mapboxSecret;
						saveProject();
					});
			});
		};


		// Remove existing Project
		$scope.remove = function (project) {
			if (project) {
				project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function () {
					$location.path('projects');
				});
			}
		};

		// Update existing Project
		$scope.update = function () {
			var project = $scope.project;

			project.$update(function () {
				$location.path('projects/' + project._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Projects
		$scope.find = function () {
			$scope.projects = Projects.query();
		};

		// Find existing Project
		$scope.findOne = function () {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};

		$scope.completed = function () {
			var formField;
			for (formField in $scope.createProject) {
				if ($scope.createProject === null) {
					return $scope.completed = false;
				} else {
					$scope.completed = true;
				}
			}
		};

		//CKEDITOR.replace('story');
		$scope.editorOptions = {
			language: 'en',
			uiColor: '#02211D'
		};
		CKEDITOR.replaceClass = 'ck-crazy';

		var cssLayout = function () {
			[].slice.call(document.querySelectorAll('input.input_field')).forEach(function (inputEl) {
				// in case the input is already filled..
				if (inputEl.value.trim() !== '') {
					classie.add(inputEl.parentNode, 'input-filled');
				}

				// events:
				inputEl.addEventListener('focus', onInputFocus);
				inputEl.addEventListener('blur', onInputBlur);
			});

			function onInputFocus(ev) {
				classie.add(ev.target.parentNode, 'input-filled');
			}

			function onInputBlur(ev) {
				if (ev.target.value.trim() === '') {
					classie.remove(ev.target.parentNode, 'input-filled');
				}
			}
		};
		cssLayout();

	}
]);