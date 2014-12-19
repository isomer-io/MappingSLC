'use strict';

//Menu service used for managing  menus
angular.module('map').factory('mapboxLayers', [,
      function() {

                  L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                        maxZoom: 18,
                        id: key
                  });

                  //todo: complete project schema with the following properties and call on them to populate what is currently hard-coded
                  L.mapbox.featureLayer({
                        // this feature is in the GeoJSON format: see geojson.org
                        // for the full specification
                        type: 'Feature',
                        geometry: {
                              type: 'Point',
                              // coordinates here are in longitude, latitude order because
                              // x, y is the standard for GeoJSON and many formats
                              coordinates: [
                                    -111.902,
                                    40.773
                              ]
                        },
                        properties: {
                              title: 'title',
                              description: 'description',
                              // one can customize markers by adding simplestyle properties
                              // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
                              'marker-size': 'large',
                              'marker-color': '#BE9A6B',
                              'marker-symbol': 'cafe'
                        }
                  })
                        .addTo(map);


            //todo: Add ability to toggle markers based on categories, where categories is a variable
      }

]);
