'use strict';

angular.module('core').directive('randomMapDirective', [
    function ($scope) {

        var staticMap = null;

        var maps = {
            'originalMap': 'poetsrock.55znsh8b',
            'grayMap': 'poetsrock.b06189bb',
            'mainMap': 'poetsrock.la999il2',
            'topoMap': 'poetsrock.la97f747',
            'greenMap': 'poetsrock.jdgpalp2',
            'funkyMap': 'poetsrock.23d30eb5'
        };

        /**
         lng: -111.784-999 , -112.0-060,
         lat: 40.845-674
         **/

        //array of
        var randomMap = [maps.originalMap, maps.grayMap, maps.mainMap, maps.topoMap, maps.greenMap, maps.funkyMap];

        var getRandomArbitrary = function (min, max) {
            return Math.random() * (max - min) + min;
        };

        var randomLat = function () {
            var randomLngInt = Math.floor(getRandomArbitrary(111, 113));
            if (randomLngInt === 111) {
                return '-111.' + Math.floor(getRandomArbitrary(7840, 9999));
            } else {
                var randomDecimal = Math.floor(getRandomArbitrary(100, 600));
                return '-112.0' + randomDecimal;
            }
        };

        var randomLng = function () {
            return '40.' + Math.floor(getRandomArbitrary(0, 9999));
        };

        var randomMapId = function () {
            return Math.floor(getRandomArbitrary(0, 7));
        };

        var randomZoom = function () {
            return Math.floor(getRandomArbitrary(10, 18));
        };

        return {
            template: '<div></div>',
            restrict: 'EA',
            link: function postLink(scope, element, attrs) {
                staticMap = 'http://api.tiles.mapbox.com/v4/' + randomMap[randomMapId()] + '/' + randomLat() + ',' + randomLng() + ',' + randomZoom() + '/' + '1280x720.png?access_token=pk.eyJ1IjoicG9ldHNyb2NrIiwiYSI6Imc1b245cjAifQ.vwb579x58Ma-CcnfQNamiw';
            }

        };
    }
]);