'use strict';

angular.module('projects').service('GeoCodeApi', ['$http',
	function($http) {

		// Geocodeapi service logic

        this.callGeoCodeApi = function(project, key, secret, projectSaveCallback){
            console.log('keys from geoCode service: ', key, secret);
            console.log('err, there\'s an error, yo.');
            if (!project || !project.state || !project.city || !project.zip || !project.street || !key || !secret) {
                projectSaveCallback();
                return;
            }

         return $http.get('http://geocoder.cit.api.here.com/6.2/geocode.json' +
            '?state=' + project.state +
            '&city=' + project.city +
            '&postalcode=' + project.zip +
            '&street=' + project.street +
            '&gen=8' +
            '&app_id=' + key +
            '&app_code=' + secret)
             .success(function(geoData){
                 project.lat = geoData.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                 project.lng = geoData.Response.View[0].Result[0].Location.DisplayPosition.Longitude;

         }).error(function(error) {
                 var x = 0;
                 //TODO: handle this gracefully
             });

        };

	}
]);