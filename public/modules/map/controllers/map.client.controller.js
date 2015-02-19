'use strict';

angular.module('map').controller('MapController', ['$scope', 'Authentication', 'MapboxApiKeys', '$http','ErrorHandleService',
    function ($scope, Authentication, MapboxApiKeys, $http, ErrorHandleService) {

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
            var map = L.mapbox.map('map', key)
                .setView([40.773, -111.902], 12);

            L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: key
            })
            .addTo(map);


            $http.get('/places').success(function (mapData) {
                console.log(mapData);
                var placeLength = mapData.results.length;
                for (var place = 0; place < placeLength; place++) {

                    var mapLat = mapData.results[place].geometry.location.lat;
                    var mapLng = mapData.results[place].geometry.location.lng;
                    //mapSmbol is blah blah
                    var mapSymbol = function() {
                        if(1 === 1){
                            return mapData.results[place].types[0];
                        }else if(statusError === 400){
                            var typesLength = mapData.results[place].types.length;
                            for (var markerType = 0; markerType < typesLength; markerType++)
                                return mapData.results[place].types[markerType];
                        }else{
                            return 'marker';
                        }

                    };
                    ErrorHandleService.response();
                    console.log(mapSymbol());

                    L.marker([mapLat, mapLng], {
                        icon: L.mapbox.marker.icon({
                            'marker-size': 'large',
                            'marker-symbol': mapSymbol(),
                            'marker-color': '#00295A'
                        })
                    })
                    .addTo(map);
                }
            });
        };
    }
]);
