'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', '$http', '$modal', '$rootScope', 'GeoCodeApi',
    function ($scope, $stateParams, $location, Authentication, Projects, $http, $modal, GeoCodeApi) {
        $scope.authentication = Authentication;
        $scope.logo = '../../../modules/core/img/brand/mapping.png';
        var width = '800';
        var height = '350';
        var markerUrl = 'url-http%3A%2F%2Fwww.mappingslc.org%2Fimages%2Fsite_img%2Flogo_marker_150px.png';
        $scope.mapImage = '';

        $scope.street = '217 E Broadway';
        $scope.city = 'Salt Lake City';
        $scope.state = 'UT';
        $scope.zip = 84111;
        $scope.title = 'Title This, Again, Yo!';
        $scope.story = 'You still ready?';




        //Give user warning if leaving form

        var preventRunning = false;
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (preventRunning) {
                return;
            }
            console.log('fromState: ', fromState);
            if (fromState.url === '/projects/create') {
                event.preventDefault();

                $modal.open({
                    templateUrl: '/modules/projects/directives/views/modal.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.closeMe = function () {
                            $modalInstance.dismiss(function (reason) {
                                console.log(reason);
                            });
                        };
                        $scope.leave = function () {
                            preventRunning = true;
                            $scope.closeMe();
                            $location.path(toState);
                        };
                    },
                    size: 'sm'
                });
            }

        });

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
                console.log('keys in controller: ', project);

                GeoCodeApi.callGeoCodeApi(project, hereKey, hereSecret, saveProject)
                    .success(function (data) {
                        console.log('geocoded data: ', data);
                        project.mapImage = 'http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + markerUrl + '(' + project.lng + ',' + project.lat + ')/' + project.lng + ',' + project.lat + ',13/' + width + 'x' + height + '.png?access_token=' + mapboxSecret;
                        saveProject();
                    });
            }).
            error(function(errorData){
                    console.log('errorData', errorData);
                });






            ////back-end request to get mapbox and here api access
            //$http.get('/keys')
            //    .success(function(data){
            //        var mapboxKey = data.mapboxKey;
            //        var mapboxSecret = data.mapboxSecret;
            //
            //        //from submitted project's address fields, return lng. and lat. coordinates
            //        $http.get('http://geocoder.cit.api.here.com/6.2/geocode.json' +
            //        '?state=' + project.state +
            //        '&city=' + project.city +
            //        '&postalcode=' + project.zip +
            //        '&street=' + project.street +
            //        '&gen=8' +
            //        '&app_id=' + data.hereKey +
            //        '&app_code=' + data.hereSecret)
            //            .success(function (geoData) {
            //                //save lat & lng to backend
            //                project.lat = geoData.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
            //                project.lng = geoData.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
            //
            //                //save to backend static map image that is centered on the lat & lng for an individual project sub;
            //                //map and custom icon will be displayed on project-view page
            //                project.mapImage = 'http://api.tiles.mapbox.com/v4/' + mapboxKey + '/' + markerUrl + '(' + project.lng + ',' + project.lat + ')/' + project.lng + ',' + project.lat + ',13/' + width + 'x' + height + '.png?access_token=' + mapboxSecret;
            //
            //                //Redirect after save
            //                project.$save(function(response) {
            //                    $location.path('projects/' + response._id);
            //
            //                    // Clear form fields
            //                    $scope.street = '';
            //                    $scope.city = '';
            //                    $scope.state = '';
            //                    $scope.zip= '';
            //                    $scope.title= '';
            //                    $scope.story = '';
            //                }, function(errorResponse) {
            //                    $scope.error = errorResponse.data.message;
            //                });
            //
            //            })
            //            .error(function (data, status) {
            //                console.log(data, status);
            //            });
            //    })
            //    .error(function(data, status){
            //        alert('Failed to load Here API key. Status: ' + status);
            //    });
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

        CKEDITOR.replace('story');

    }
]);