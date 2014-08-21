



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


// Find and store a variable reference to the list of filters.
 //           var filters = document.getElementById('filters');

// Wait until the marker layer is loaded in order to build a list of possible
// types. If you are doing this with another featureLayer, you should change
// map.featureLayer to the variable you have assigned to your featureLayer.
 //           map.featureLayer.on('ready', function() {
                // Collect the types of symbols in this layer. you can also just
                // hardcode an array of types if you know what you want to filter on,
                // like var types = ['foo', 'bar'];
//                var typesObj = {}, types = [];
//                var features = map.featureLayer.getGeoJSON().features;
//                for (var i = 0; i < features.length; i++) {
//                    typesObj[features[i].properties['marker-symbol']] = true;
//                }
//                for (var k in typesObj) types.push(k);
//
//                var checkboxes = [];
//                // Create a filter interface.
//                for (var i = 0; i < types.length; i++) {
//                    // Create an an input checkbox and label inside.
//                    var item = filters.appendChild(document.createElement('div'));
//                    var checkbox = item.appendChild(document.createElement('input'));
//                    var label = item.appendChild(document.createElement('label'));
//                    checkbox.type = 'checkbox';
//                    checkbox.id = types[i];
//                    checkbox.checked = true;
//                    // create a label to the right of the checkbox with explanatory text
//                    label.innerHTML = types[i];
//                    label.setAttribute('for', types[i]);
//                    // Whenever a person clicks on this checkbox, call the update().
//                    checkbox.addEventListener('change', update);
//                    checkboxes.push(checkbox);
//                }
//
//                // This function is called whenever someone clicks on a checkbox and changes
//                // the selection of markers to be displayed.
//                function update() {
//                    var enabled = {};
//                    // Run through each checkbox and record whether it is checked. If it is,
//                    // add it to the object of types to display, otherwise do not.
//                    for (var i = 0; i < checkboxes.length; i++) {
//                        if (checkboxes[i].checked) enabled[checkboxes[i].id] = true;
//                    }
//                    map.featureLayer.setFilter(function(feature) {
//                        // If this symbol is in the list, return true. if not, return false.
//                        // The 'in' operator in javascript does exactly that: given a string
//                        // or number, it says if that is in a object.
//                        // 2 in { 2: true } // true
//                        // 2 in { } // false
//                        return (feature.properties['marker-symbol'] in enabled);
//                    });
//                }
//
//

//load GeoJSON
//            var geojson = [
//                {
//                    'type': 'Feature',
//                    'geometry': {
//                        'type': 'Point',
//                        'coordinates': [-111.902, 40.773]
//                    },
//                    'properties': {
//                        'title': 'Static Test',
//                        'description': '1714 14th St NW, Washington DC',
//                        'marker-color': '#fc4353',
//                        'marker-size': 'large',
//                        'marker-symbol': 'monument'
//                    }
//                }

//                {
//                    'type': 'Feature',
//                    'geometry': {
//                        'type': 'Point',
//                        'coordinates': [-122.414, 37.776]
//                    },
//                    'properties': {
//                        'title': 'Mapbox SF',
//                        'description': '155 9th St, San Francisco',
//                        'marker-color': '#fc4353',
//                        'marker-size': 'large',
//                        'marker-symbol': 'harbor'
//                    }
//                }
//            ];

//            map = L.mapbox.map('map', 'poetsrock.map-55znsh8b')
////                .setView([40.773, -111.902], 12);
//                .featureLayer.setGeoJSON(geojson);
        };

    }
]);