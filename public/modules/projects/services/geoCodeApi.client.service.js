'use strict';

angular.module('projects').service('GeoCodeApi', ['$http',
	function($http) {

		// Geocodeapi service logic

        this.callGeoCodeApi = function(project, key, secret, projectSaveCallback){
            console.log('keys from geoCode service: ', key, secret);
            if (!project || !project.state || !project.city || !project.zip || !project.street || !key || !secret) {
                projectSaveCallback();
                console.log('err, there\'s an error, yo.');
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
                 //console.log('lat: ', project.lat + '\nlng:', project.lng);

         }).error(function(error) {
                 console.log('geocode error: ', error);
                 //TODO: handle this gracefully
             });

        };

	}
]);