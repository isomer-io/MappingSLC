'use strict';

angular.module('map').controller('MapController', ['$scope', 'Authentication', 'MapboxApiKeys', '$http',
    function ($scope, Authentication, MapboxApiKeys, $http) {

        $scope.markers = true;
        $scope.filters = true;

        $scope.censusDataTractLayer = true;
        $scope.googlePlacesLayer = true;


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

            L.control.layers({
                'Main Map': L.mapbox.tileLayer('poetsrock.la999il2').addTo(map),
                'Topo Map': L.mapbox.tileLayer('poetsrock.la97f747')
            }, {
                //this is where you would add optional tilelayers. This sedction is required,
                //even if no tileLayers are present.
                //'Tract Boundaries': L.mapbox.tileLayer('examples.bike-lanes'),
            }).addTo(map);

            //get the json file on the backend (/config/env/) for the Census Tract Data
            var tractData = $http.get('/tractData')
                .success(function (tractGeoJson) {
                    tractDataLayer(tractGeoJson);
                })
                .error(function (tractErrorData) {
                }
            );

            //style the polygon tracts
            var style = {
                'stroke': true,
                'clickable': true,
                'color': "#00D",
                'fillColor': "#00D",
                'weight': 1.0,
                'opacity': 0.2,
                'fillOpacity': 0.0,
                'className': ''  //String that sets custom class name on an element
            };
            var hoverStyle = {
                'color': "#00D",
                "fillOpacity": 0.5,
                'weight': 1.0,
                'opacity': 0.2,
                'className': ''  //String that sets custom class name on an element
            };
            var hoverOffset = new L.Point(30, -16);


            var censusTractData = null;

            var tractDataLayer = function (tractGeoJson) {
                censusTractData = L.geoJson(tractGeoJson, {
                        style: style,
                        onEachFeature: function (feature, layer) {
                            if (feature.properties) {
                                var popupString = '<div class="popup">';
                                for (var k in feature.properties) {
                                    var v = feature.properties[k];
                                    popupString += k + ': ' + v + '<br />';
                                }
                                popupString += '</div>';
                                layer.bindPopup(popupString);
                            }
                            if (!(layer instanceof L.Point)) {
                                layer.on('mouseover', function () {
                                    layer.setStyle(hoverStyle);
                                    //layer.setStyle(hoverOffset);
                                });
                                layer.on('mouseout', function () {
                                    layer.setStyle(style);
                                    //layer.setStyle(hoverOffset);
                                });
                            }

                        }
                    }
                );
                censusTractData.addTo(map);
            };

            //create toggle/filter functionality for Census Tract Data
            $scope.toggleCensusData = function () {
                if ($scope.censusDataTractLayer) {
                    map.removeLayer(censusTractData);
                } else {
                    map.addLayer(censusTractData);
                }
            };


            //Google Places API
            var googlePlacesMarker = null;
            var googlePlacesMarkerLayer = null;
            var mapSymbol = {};
            var googlePlacesMarkerArray = [];

            var googlePlacesData = function() {
            $http.get('/places').success(function (poiData) {
                console.log('poiData: ', poiData);

                var placeLength = poiData.results.length;
                for (var place = 0; place < placeLength; place++) {

                    var mapLat = poiData.results[place].geometry.location.lat;
                    var mapLng = poiData.results[place].geometry.location.lng;
                    var mapTitle = poiData.results[place].name;
                    console.log('LatLng: ', mapLat, mapLng);
                    console.log('Title: ', mapTitle);

                    //mapSymbol = function () {
                    //    if (poiData.results[place].types[0] !== 'neighborhood' && poiData.results[place].types[0] !== 'stadium' && poiData.results[place].types[0] !== 'store' && poiData.results[place].types[0] !== 'church' && poiData.results[place].types[0] !== 'clothing_store' && poiData.results[place].types[0] !== 'university' && poiData.results[place].types[0] !== 'establishment') {
                    //        return poiData.results[place].types[0];
                    //    } else {
                    //        return 'marker';
                    //    }
                    //
                    //};

                    googlePlacesMarker = L.marker([mapLat, mapLng]).toGeoJSON();
                    console.log('googlePlacesMarker: ', googlePlacesMarker);

                    googlePlacesMarkerArray.push(googlePlacesMarker);
                    console.log('googlePlacesMarkerArray: ', googlePlacesMarkerArray);
                } //end of FOR loop

                googlePlacesMarkerLayer = L.geoJson(googlePlacesMarkerArray, {
                    style: function (feature) {
                        return {
                            'title': mapTitle,
                            'marker-size': 'large',
                            //'marker-symbol': mapSymbol(),
                            'marker-symbol': 'marker',
                            'marker-color': '#00295A',
                            'riseOnHover': true,
                            'riseOffset': 250,
                            'opacity': 0.5,
                            'clickable': true
                        }
                    }
                })
                .addTo(map);
                console.log('googlePlacesMarkerLayer: ', googlePlacesMarkerLayer);
            });
        };
        console.log('googlePlacesData(): ', googlePlacesData());
            $scope.toggleGooglePlacesData = function () {
                if ($scope.googlePlacesLayer) {
                    map.removeLayer(googlePlacesMarkerLayer);
                } else {
                    map.addLayer(googlePlacesMarkerLayer);
                }
            };

        };
    }
]);