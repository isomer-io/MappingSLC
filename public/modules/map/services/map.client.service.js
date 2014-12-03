//'use strict';
//
////Menu service used for managing  menus
//angular.module('map').service(['$http',
//    function($http) {
//
//        $http.get('/mapKeys')
//            .success(function(data){
//                mapFunction(data.mapboxKey, data.mapboxAccessToken);
//            })
//            .error(function(data, status){
//                alert('Failed to load Mapbox API key. Status: ' + status);
//            });
//
//        this.mapFunction = function(key, accessToken) {
//
//            L.mapbox.accessToken = accessToken;
//            this.map = L.mapbox.map('map', key)
//                .setView([40.773, -111.902], 12);
//
//            L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
//                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//                maxZoom: 18,
//                id: key
//            })
//
//            .addTo(map);
//
//        };
//
//    }
//
//]);