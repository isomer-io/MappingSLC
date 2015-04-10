'use strict';

angular.module('map').controller('MapController', ['$scope', 'Authentication', 'ApiKeys', '$http', '$rootScope', 'MarkerDataService',
    function ($scope, Authentication, ApiKeys, $http, $rootScope, MarkerDataService) {

        $scope.markers = true;
        $scope.filters = true;
        $scope.censusDataTractLayer = true;
        $scope.googlePlacesLayer = false;
        $scope.toggleDetails = false;
        var sidebarToggle = false;

        var mainMap = null;
        var grayMap = null;
        var map2 = null;
        var map3 = null;

        var censusTractData = null;
        var dataBoxStaticPopup = null;
        var dataBoxStaticPopupFn = null;
        var setMarkerDataBox = null;
        var tractData = {};

        //$scope.getCensusData = [];
        //
        //service that returns api keys
        ApiKeys.getApiKeys()
            .success(function (data) {
                mapFunction(data.mapboxKey, data.mapboxSecret);
                //callCensusApi(data.censusKey);
            })
            .error(function (data, status) {
                alert('Failed to load Mapbox API key. Status: ' + status);
            });
        //
        ////todo refactor into CensusData service
        //var callCensusApi = function(censusKey) {
        //    var censusDataKey = ['P0010001'];
        //    var censusYear = [2000, 2010, 2011, 2012, 2013, 2014];
        //
        //    $http.get('http://api.census.gov/data/' + censusYear[1] + '/sf1?get=' + censusDataKey[0] + '&for=tract:*&in=state:49+county:035&key=' + censusKey)
        //        .success(function (censusData) {
        //        for (var i = 0; i < censusData.length; i++) {
        //            //censusPopulationData(censusData);
        //            $scope.getCensusData += $scope.getCensusData;
        //            console.log('map censusData: ', censusData[i]);
        //        }
        //    })
        //        .error(function (censusDataError, status) {
        //            $scope.censusData = censusDataError || 'Request failed';
        //            $scope.status = status;
        //        });
        //};

        //
        //call the map and add functionality
        //
        var mapFunction = function (key, accessToken) {
            //creates a Mapbox Map
            L.mapbox.accessToken = accessToken;

            //'info' id is part of creating tooltip with absolute position
            var info = document.getElementById('info');

            var map = L.mapbox.map('map')
                .setView([40.773, -111.902], 12)
                //allow users to share maps on social media
                // source: https://www.mapbox.com/mapbox.js/api/v2.1.5/l-mapbox-sharecontrol/
                .addControl(L.mapbox.shareControl())
                .addControl(L.mapbox.geocoderControl('mapbox.places'));

            L.mapbox.tileLayer('poetsrock.b06189bb').addTo(map);
            grayMap = L.mapbox.tileLayer('poetsrock.b06189bb');
            mainMap = L.mapbox.tileLayer('poetsrock.la999il2');
            map2 = L.mapbox.tileLayer('poetsrock.la97f747');
            map3 = L.mapbox.tileLayer('poetsrock.jdgpalp2');


            L.control.layers({
                'Main Map': L.mapbox.tileLayer('poetsrock.la999il2'),
                'Topo Map': L.mapbox.tileLayer('poetsrock.la97f747'),
                'Green Map': L.mapbox.tileLayer('poetsrock.jdgpalp2')
            }, {
                //this is where you would add optional tilelayers. This section is required,
                //even if no tileLayers are present.
                //'Tract Boundaries': L.mapbox.tileLayer('examples.bike-lanes'),
            }).addTo(map);


            var sidebar = L.control.sidebar('sidebar', {
                closeButton: true,
                position: 'left'
            }).addTo(map);
            //map.addControl(sidebar);


            //add marker where sidebar will toggle from
            //var sidePop = L.mapbox.featureLayer({
            L.mapbox.featureLayer({
                // this feature is in the GeoJSON format: see geojson.org
                // for the full specification
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    // coordinates here are in longitude, latitude order because
                    // x, y is the standard for GeoJSON and many formats
                    coordinates: [
                        -111.702,
                        40.773
                    ]
                },
                properties: {
                    title: 'Peregrine The Espresso',
                    description: '1718 14th St NW, Washington, DC',
                    // one can customize markers by adding simplestyle properties
                    // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                    'marker-size': 'large',
                    'marker-color': '#BE9A6B',
                    'marker-symbol': 'cafe'
                }
            })

                .on('click', function (e) {


                    ////the below line of code centers the map when the marker is clicked
                    ////source: https://www.mapbox.com/mapbox.js/example/v1.0.0/centering-markers/
                    map.panTo(e.layer.getLatLng());

                    //$scope.$apply(
                    //    function(){
                    //        $scope.toggleDetails = !$scope.toggleDetails;
                    //    }
                    //);
                    sidebar.getContainer();
                    //sidebar.setContent('test <b>test</b> test');
                    if (sidebarToggle === false) {
                        $rootScope.animateLogoCheck = true;
                        setTimeout(function () {
                            sidebar.open('settings');
                        }, 500);
                        sidebarToggle = true;
                    }else{
                        setTimeout(function () {
                            sidebar.close();
                        }, 500);
                        sidebarToggle = false;
                    }
                })

                .addTo(map);

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

            ApiKeys.getTractData()
                .success(function (tractData) {
                    tractDataLayer(tractData);
                })
                .error(function (tractData) {
                    alert('Failed to load tractData. Status: ' + status);
                });
            var tractDataLayer = function (tractData) {
                censusTractData = L.geoJson(tractData, {
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
            };

            //MarkerDataService.getMarkerData()
            //    .success(function (projectMarkerData) {
            //        //dataBoxStaticPopupFn(projectMarkerData);
            //        setMarkerDataBox(projectMarkerData);
            //    })
            //    .error(function (data, status) {
            //    });
            //
            //setMarkerDataBox = function(){
            //    dataBoxStaticPopup = L.mapbox.featureLayer().setGeoJSON(projectMarkerData);
            //}();

            dataBoxStaticPopupFn = function (dataBoxStaticPopup) {
                //dataBoxStaticPopup = L.mapbox.featureLayer().setGeoJSON(projectMarkerData);

                // Listen for individual marker clicks.
                dataBoxStaticPopup.on('mouseover', function (e) {
                    // Force the popup closed.
                    e.layer.closePopup();

                    var feature = e.layer.feature;
                    var content = '<div><strong>' + feature.properties.title + '</strong>' +
                        '<p>' + feature.properties.description + '</p></div>';

                    info.innerHTML = content;
                });

                function empty() {
                    info.innerHTML = '<div><strong>Click a marker</strong></div>';
                }

                // Clear the tooltip when map is clicked.
                map.on('move', empty);

                // Trigger empty contents when the script
                // has loaded on the page.
                empty();

            };

            //Google Places API
            var googlePlacesMarker = null;
            var googlePlacesMarkerLayer = null;
            var googlePlacesMarkerArray = [];

            var googlePlacesData = function () {
                $http.get('/places').success(function (poiData) {

                    var placeLength = poiData.results.length;
                    for (var place = 0; place < placeLength; place++) {

                        var mapLat = poiData.results[place].geometry.location.lat;
                        var mapLng = poiData.results[place].geometry.location.lng;
                        var mapTitle = poiData.results[place].name;

                        googlePlacesMarker = L.marker([mapLat, mapLng]).toGeoJSON();

                        googlePlacesMarkerArray.push(googlePlacesMarker);
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
                });
            };

            //create toggle/filter functionality for Census Tract Data
            $scope.toggleCensusData = function () {
                if (!$scope.censusDataTractLayer) {
                    map.removeLayer(censusTractData);
                    map.removeLayer(dataBoxStaticPopup);
                    //map.removeLayer(dataBoxStaticPopup.setGeoJSON(projectMarkerData));
                    //map.removeLayer(markers);
                } else {
                    map.addLayer(censusTractData);
                    map.addLayer(dataBoxStaticPopup);
                    //map.addLayer(dataBoxStaticPopup.setGeoJSON(projectMarkerData));
                    //map.addLayer(markers);

                }
            };

            //create toggle/filter functionality for Census Tract Data
            $scope.toggleGooglePlacesData = function () {
                if ($scope.googlePlacesLayer) {
                    map.removeLayer(googlePlacesMarkerLayer);
                } else {
                    map.addLayer(googlePlacesMarkerLayer);
                }
            };

            //connects to the sidebar client controller to open the modal when 'home' is clicked on the sidebar
            $rootScope.$on('SHOW_MAP', function () {
                map.removeLayer(grayMap);
                mainMap.addTo(map);
            });

            //connects to the sidebar client controller to close the modal when the sidebar is opened
            $rootScope.$on('HIDE_MAP', function () {
                grayMap.addTo(map);
                map.removeLayer(mainMap);
            });
        };

    }
]);