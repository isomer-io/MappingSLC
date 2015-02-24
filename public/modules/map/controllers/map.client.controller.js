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

            L.control.layers({
                'Main Map, Ma\'am': L.mapbox.tileLayer('poetsrock.map-55znsh8b').addTo(map),
                'Eat Yer Greens': L.mapbox.tileLayer('poetsrock.jdgpalp2')
            }, {
                'Tract Boundaries': L.mapbox.tileLayer('poetsrock.7c0b2f7a'),
                'Other': L.mapbox.tileLayer('poetsrock.control-room')
            }).addTo(map);




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
                    console.log('mapTitle: ', mapTitle);
                    //mapSmbol is blah blah
                    var mapSymbol = function() {
                        if(mapData.results[place].types[0] !== 'neighborhood' && mapData.results[place].types[0] !== 'stadium' && mapData.results[place].types[0] !== 'store' && mapData.results[place].types[0] !== 'church' && mapData.results[place].types[0] !== 'clothing_store' && mapData.results[place].types[0] !== 'university' && mapData.results[place].types[0] !== 'establishment'){
                            return mapData.results[place].types[0];
                        //}else if(statusError === 400){
                        //    var typesLength = mapData.results[place].types.length;
                        //    for (var markerType = 0; markerType < typesLength; markerType++)
                        //        return mapData.results[place].types[markerType];
                        }else{
                            return 'marker';
                        }

                    };
                    console.log('mapSymbol(): ', mapSymbol());

                    L.marker([mapLat, mapLng], {
                        icon: L.mapbox.marker.icon({
                            'title': mapTitle,
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