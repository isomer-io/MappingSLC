'use strict';

angular.module('projects').service('GeoCodeApi', ['$http',
  function ($http) {

    // Geocodeapi service logic

    this.callGeoCodeApi = function (project, key, secret, projectSaveCallback) {
      console.log('project:\n', project, '\nkey:\n', key, '\nsecret:\n', secret);
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
        .success(function (geoData) {
          console.log('success:  modules/projects/client/services/geoCodeApi.client.service.js line 24');
          project.lat = geoData.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
          project.lng = geoData.Response.View[0].Result[0].Location.DisplayPosition.Longitude;

        }).error(function (data, status) {
          console.log('geocode error:\n', data, 'status:\n', status);
          //TODO: handle this gracefully
        });

    };
  }
]);
