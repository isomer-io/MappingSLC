



'use strict';



angular.module('map').controller('MapController', ['$scope', 'Authentication', '$http', '$templateCache',
    function($scope, Authentication, $http, $templateCache) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.method = 'GET';
        $scope.url = 'http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316';

        /**
         ** make the api call
         **/
        $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
            success(function (data, status, headers, config) {
                $scope.status = status;
                $scope.data = data;
                var i;
                for (i = 0; i < data.length; i++) {
                    console.log(data[i]);
                }
                console.log(status);
                console.log(headers);
                console.log(headers.length);
                console.log(config);

            }).
            error(function (data, status) {
                $scope.data = data || 'Request failed';
                $scope.status = status;
            });







        $scope.mapFunction = function() {

            L.mapbox.accessToken = 'pk.eyJ1IjoicG9ldHNyb2NrIiwiYSI6Imc1b245cjAifQ.vwb579x58Ma-CcnfQNamiw';

            var map = L.mapbox.map('map', 'poetsrock.map-55znsh8b')
                .setView([40.773, -111.902], 12);
            var filters = document.getElementById('filters');
            var checkboxes = document.getElementsByClassName('filter');

            function change() {
                // Find all checkboxes that are checked and build a list of their values
                var on = [];
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) on.push(checkboxes[i].value);
                }
                // The filter function takes a GeoJSON feature object
                // and returns true to show it or false to hide it.
                map.featureLayer.setFilter(function (f) {
                    // check each marker's symbol to see if its value is in the list
                    // of symbols that should be on, stored in the 'on' array
                    return on.indexOf(f.properties['marker-symbol']) !== -1;
                });
                return false;
            }

// When the form is touched, re-filter markers
            filters.onchange = change;
// Initially filter the markers
            change();

            L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'poetsrock.map-55znsh8b'
            });

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
                    title: 'Peregrine Espresso',
                    description: '1718 14th St NW, Washington, DC',
                    // one can customize markers by adding simplestyle properties
                    // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
                    'marker-size': 'large',
                    'marker-color': '#BE9A6B',
                    'marker-symbol': 'cafe'
                }
            })
            .addTo(map);

            /**
             *
             * Add ability to toggle markers based on categories, where categories is a variable
             *
             */



        };

    }
]);