'use strict';

angular.module('map').controller('MapController', ['$scope', 'Authentication', '$http',
    function ($scope, Authentication, $http) {

        $scope.markers = true;
        $scope.filters = true;

        //get api keys, and also access token, referred to as 'mapboxSecret'
        $http.get('/keys')
            .success(function(api) {
                censusData(api.censusKey);
                mapFunction(api.mapboxKey, api.mapboxSecret);
            })
            .error(function (errorData, errorStatus) {
                alert('Failed to load Mapbox API key. Status: ' + errorStatus);
            });

        $http.get('/utahTract')
            .success(function(tractGeojson) {
                console.log(tractGeojson);
                featureLayer(tractGeojson);
            })
            .error(function (errorData, errorStatus) {
                alert('Failed to load UTah Tract GeoJSON file. Status: ' + errorStatus);
            });

        //us census api call
        var censusData = function(censusKey) {
            $http.get('http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=' + censusKey).
                success(function (censusData) {
                    var censusDataArray = [];
                    for (var i = 0; i < censusData.length; i++) {
                        censusDataArray.push(censusData[i]);
                    }
                    //console.log('censusDataArray: ', censusDataArray);
                    console.log('censusDataArray[1][1,2,0]: ', censusDataArray[1][1] + censusDataArray[1][2] + censusDataArray[1][0]);
                    return censusDataArray
                }).
                error(function (errorData, errorStatus) {
                    $scope.data = errorData || 'Request failed';
                    $scope.status = errorStatus;
                });
        };

        //var censusGeo = function() {
        //    console.log('censusDataArray in censusGeo: ', censusDataArray);
        //    $http.get('http://census.ire.org/geo/1.0/boundary-set/tracts/490351529').
        //    success(function(censusBoundaryData) {
        //         console.log('censusBoundaryData', censusBoundaryData);
        //    })
        //};

        var featureLayer = L.mapbox.featureLayer(tractGeojson)
            .addTo(map);

        var mapFunction = function (key, accessToken) {

            //creates a Mapbox Map
            L.mapbox.accessToken = accessToken;
            var map = L.mapbox.map('map', key)
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
                id: key
            });

            //todo complete project schema with the following properties and call on them to populate what is currently hard-coded
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
                    //see also: https://www.mapbox.com/maki/
                    'marker-size': 'large',
                    'marker-color': '#BE9A6B',
                    'marker-symbol': 'cross'
                }
            })
                .addTo(map);


            /**
             *
             * Add ability to toggle markers based on categories, where categories is a variable
             *
             */


        };


// per css-tricks restarting css animations
// http://css-tricks.com/restart-css-animation/
//            $('label').click(function() {
//
//                  // find the first span which is our circle/bubble
//                  var el = $(this).children('span:first-child');
//
//                  // add the bubble class (we do this so it doesnt show on page load)
//                  el.addClass('circle');
//
//                  // clone it
//                  var newone = el.clone(true);
//
//                  // add the cloned version before our original
//                  el.before(newone);
//
//                  // remove the original so that it is ready to run on next click
//                  $("." + el.attr("class") + ":last").remove();
//            });
    }
]);
