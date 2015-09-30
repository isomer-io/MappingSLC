'use strict';

angular.module('core').service('MarkerDataService', ['$http',
    function($http) {
        // Project Marker Data Service

        this.getMarkerData = function(){
            return  $http.get('/api/v1/markerData').
                success(function(projects){
                    //console.log('projects: \n', projects);
                    //for (var prop in projects) {
                    //    console.log('projects[prop].lng: \n', projects[prop].lng);
                    //}

                })
                .error(function(error){
                    console.log('marker data error: \n', error);
                });
        };
    }
]);
