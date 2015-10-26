'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', '$http', '$modal', '$sce', 'ApiKeys', 'GeoCodeApi', '$rootScope', 'AdminAuthService', '$state', 'UtilsService', 'PublishingService',
	function ($scope, $stateParams, $location, Authentication, Projects, $http, $modal, $sce, ApiKeys, GeoCodeApi, $rootScope, AdminAuthService, $state,  UtilsService, PublishingService) {
		$scope.Authentication = Authentication;
		$scope.isAdmin = AdminAuthService;
		$scope.logo = '../../../modules/core/img/brand/mapping_150w.png';
		var width = '800';
		var height = '250';
		var markerUrl = 'url-http%3A%2F%2Fwww.mappingslc.org%2Fimages%2Fsite_img%2Flogo_marker_150px.png';
		$scope.mapImage = '';
		$rootScope.signInBeforeProject = false;

		$scope.trustAsHtml = $sce.trustAsHtml;

		$scope.init = function() {
			$scope.publishedProjects();
		};

	var publishUser = function(userId) {

		};

		//provides logic for the css in the forms
		UtilsService.cssLayout();

		var publishProject = function(project) {
			if (project.status === 'published') {
				console.log('project.user._id: ', project.user._id);
				publishUser(project.user._id);

				//need to turn add marker
				//neeeds to make sure project shows up in list
				//and contributor bio displays

				//do stuff to add marker
				//means i'll have to pull marker data out of create project and into update project
				//could probably use the same code as current, just put it in update fn
				project.previouslyPublished = true; //need some func for deleting all of this if we unpublish a project. was thinking we check if prevPub is true and current status does not equal publish, then execute unPub func.
			}
		};

		var saveProject = null;
		$scope.updateLatLng = function(project) {
			$http.get('/api/v1/keys').success(function (data) {
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
				})
				.error(function (data, status) {

				})
			});
		};

		// Find a list of all published projects
		//PublishingService.getPublishedProjects().
		$scope.publishedProjects = function() {
			$http.get('/api/v1/projects/published').
			success(function (publishedProjects) {
				$scope.publishedProjects = publishedProjects;
				console.log('$scope.publishedProjects:\n', $scope.publishedProjects);
				console.log('$scope.publishedProjects.title:\n', $scope.publishedProjects[0].title);

			}).
			error(function (data, status) {

			});
		};


		$rootScope.previousState = '';
		$rootScope.currentState = '';
		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from) {
			$rootScope.previousState = from.name;
			$rootScope.currentState = to.name;
		});
		$scope.goBack = function() {
			if ($rootScope.previousState === 'listProjects') {
				$state.go($rootScope.previousState);
			} else {
				$state.go('admin');
			}
		};
		$scope.run = function ($rootScope, $state, Authentication) {
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				if (toState.authenticate && !Authentication.isLoggedIn()) {
				}
				event.preventDefault();
			});
		};

		$scope.userLoggedin = function () {
			// get request to /users/me
			if ($location.path() === '/projects/create' ) {
				$http.get('/api/v1/users/me')
						.success(function (data) {
					if (data === null) {
						$rootScope.signInBeforeProject = true;
						$location.path('/signin');
					}
				});
			}
		}();

		var mapImage = '';

		// Create new Project
		$scope.create = function (isValid) {

			$scope.error = null;

			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'projectForm');
				return false;
			}

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

			saveProject = function () {
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

			$scope.updateLatLng(project);

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
					if ($location.path() === '/admin/edit-project/' + $scope.project._id){
						$location.path('admin/projects-queue');
					}else {
						$location.path('projects');
					}
				});
			}
		};

		// Update existing Project
		$scope.update = function () {
			var project = $scope.project;
			publishProject(project);
			project.$update(function () {
				if($location.path() === '/admin/edit-project/' + project._id) {
					//return to view mode and call notify for success message
				} else {
					$location.path('projects/' + project._id);
				}
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find a list of Projects
		$scope.find = function () {
			$scope.projects = Projects.query();
			console.log('$scope.projects', $scope.projects);
		};


		// Find existing Project
		$scope.findOne = function () {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
			var vimeoId,
					soundCloudId;
			$http.get('/api/v1/keys').success(function (data) {
				vimeoId = data.vimeoId;
				soundCloudId = data.soundCloudId;
			});
				if (soundCloudId) {
					$scope.soundCloudId = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + project.soundCloudId + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
				}
				if (vimeoId) {
					$scope.vimeoId = '' + project.vimeoId + ''
				}
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

		//modal for leaving projects
		//Give user warning if leaving form
		var preventRunning = false;
		$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			//console.log('fromState.url: ', fromState.url);
			console.log('preventRunning: ', preventRunning);
			if (preventRunning) {
				return;
			}
			if (fromState.url === '/projects/client/create' && toState.url !== '/projects/:projectId') {
				event.preventDefault();

				$modal.open({
					animation: true,
					templateUrl: '/modules/projects/client/directives/views/project-warning-modal.html',
					controller: function ($scope, $modalInstance, $location) {
						$scope.stay = function (result) {
							//$modalInstance.dismiss('cancel');
							console.log('stay just a little bit longer, oh won\'t you stay');
							$modalInstance.close(function (result) {
								console.log('result: ', result);
							});
						};
						$scope.leave = function () {
							preventRunning = true;
							$scope.stay();
							$location.path(toState);
						};
					},
					size: 'lg'
				});

			}
		});

		//admin panel editing
		$scope.toggleEdit = false;
		$scope.toggleId = 0;

		$scope.toggleEditFn = function(editNum) {
			$scope.toggleEdit = !$scope.toggle;
			$scope.toggleId = editNum;
		};

		/**
		 * nlp
		**/
		//$scope.nlpData = null;
		//var getNlpData = function() {
		//	$http.get('/nlp').
		//		success(function (nlpData) {
		//			console.log(nlpData);
		//			$scope.nlpData = nlpData;
		//		}).
		//		error(function () {
		//		});
		//};


	}
]);

