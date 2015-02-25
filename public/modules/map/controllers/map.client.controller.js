'use strict';

angular.module('map').controller('MapController', ['$scope', 'Authentication', 'MapboxApiKeys', '$http',
    function ($scope, Authentication, MapboxApiKeys, $http) {

        $scope.markers = true;
        $scope.filters = true;

        MapboxApiKeys.getApi()
            .success(function (data) {
                mapFunction(data.mapboxKey, data.mapboxSecret);

            })
            .error(function (data, status) {
                alert('Failed to load Mapbox API key. Status: ' + status);
            });

        var mapFunction = function (key, accessToken) {

            //creates a Mapbox Map
            L.mapbox.accessToken = accessToken;
            var map = L.mapbox.map('map')
                .setView([40.773, -111.902], 12);

            ////centers on marker when popup icon is clicked
            //// source: https://www.mapbox.com/mapbox.js/example/v1.0.0/centering-markers/
            //map.featureLayer.on('click', function(e) {
            //    map.panTo(e.layer.getLatLng());
            //});

            L.control.layers({
                'Main Map, Ma\'am': L.mapbox.tileLayer('poetsrock.map-55znsh8b').addTo(map),
                'Eat Yer Greens': L.mapbox.tileLayer('poetsrock.jdgpalp2')
            }, {
                'Tract Boundaries': L.mapbox.tileLayer('poetsrock.7c0b2f7a'),
                'Other': L.mapbox.tileLayer('poetsrock.control-room')
            }).addTo(map);


            var tractData = $http.get('/tractData')
                .success(function (tractGeoJson) {
                    tractDataLayer(tractGeoJson);
                    console.log(tractGeoJson);
                })
                .error(function (tractErrorData) {
                    console.log(tractErrorData);
                }
            );

            //var tractDataLayer = function(tractGeoJson){
            //    L.mapbox.featureLayer(tractGeoJson)
            //        .addTo(map);
            //};

            var tractDataLayer = function (tractGeoJson) {
                L.geoJson(tractGeoJson, {
                        style: function (feature) {
                            return {
                                //properties can be found here: http://leafletjs.com/reference.html#path
                                stroke: true,
                                weight: 1,  //stroke in pixels
                                color: '#010101',
                                fill: false,
                                clickable: true,
                                className: ''  //String that sets custom class name on an element
                            };
                        },
                        onEachFeature: function (feature, layer) {
                            layer.bindPopup(feature.properties.description);
                        }

                    }
                )
                    .addTo(map);

            };

            //L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
            //    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            //    maxZoom: 18,
            //    id: key
            //})
            //    .addTo(map);

            $http.get('/places').success(function (mapData) {
                console.log('mapData', mapData);
                var placeLength = mapData.results.length;
                for (var place = 0; place < placeLength; place++) {

                    var mapLat = mapData.results[place].geometry.location.lat;
                    var mapLng = mapData.results[place].geometry.location.lng;
                    var mapTitle = mapData.results[place].name;
                    //console.log('mapTitle: ', mapTitle);
                    //mapSmbol is blah blah
                    var mapSymbol = function () {
                        if (mapData.results[place].types[0] !== 'neighborhood' && mapData.results[place].types[0] !== 'stadium' && mapData.results[place].types[0] !== 'store' && mapData.results[place].types[0] !== 'church' && mapData.results[place].types[0] !== 'clothing_store' && mapData.results[place].types[0] !== 'university' && mapData.results[place].types[0] !== 'establishment') {
                            return mapData.results[place].types[0];
                            //}else if(statusError === 400){
                            //    var typesLength = mapData.results[place].types.length;
                            //    for (var markerType = 0; markerType < typesLength; markerType++)
                            //        return mapData.results[place].types[markerType];
                        } else {
                            return 'marker';
                        }

                    };
                    //console.log('mapSymbol(): ', mapSymbol());

                    //properties for markers are gathered from the api docs of both Mapbox and Leaflet.
                    //Mapbox:
                    //Leafleft: http://leafletjs.com/reference.html#marker,
                    //http://leafletjs.com/reference.html#icon
                    var styledIcon = L.mapbox.marker.icon({
                        'title': mapTitle,
                        'marker-size': 'large',
                        'marker-symbol': mapSymbol(),
                        'marker-color': '#00295A',
                        'riseOnHover': true,
                        'riseOffset': 250,
                        'opacity': 0.1,
                        'clickable': true
                    });
                    L.marker([mapLat, mapLng], {icon: styledIcon})
                        .addTo(map);
                }

                //L.marker([mapLat, mapLng]).bindPopup(
                //    {icon: styledIcon}
                //)
                //    .addTo(map);


            });

            //creates filter
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

        };
    }
]);