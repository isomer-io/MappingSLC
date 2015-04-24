'use strict';

angular.module('core').service('RandomMapService', [
    function () {

        var staticMap = null;

        var maps = {
            'originalMap': 'poetsrock.55znsh8b',
            'grayMap': 'poetsrock.b06189bb',
            'mainMap': 'poetsrock.la999il2',
            'topoMap': 'poetsrock.la97f747',
            'greenMap': 'poetsrock.jdgpalp2'
        };

        //array of
        var randomMap = [
            maps.originalMap, maps.grayMap, maps.mainMap, maps.topoMap, maps.greenMap];

        var getRandomArbitrary = function (min, max) {
            return Math.random() * (max - min) + min;
        };

        var randomLat = function (){
            var randomLngInt = Math.floor(getRandomArbitrary(111, 113));
            if (randomLngInt === 111){
                return '-111.' + Math.floor(getRandomArbitrary(7840, 9999));
            }else{
                var randomDecimal = Math.floor(getRandomArbitrary(100, 600));
                return '-112.0' + randomDecimal;
            }
        };

        var randomLng = function (){
            return '40.' + Math.floor(getRandomArbitrary(0, 9999));
            //
        };

        var randomMapId = function(){
            return Math.floor(getRandomArbitrary(0, 5));
        };

        var randomZoom = function(){
            return Math.floor(getRandomArbitrary(9, 16));
        };

        this.getRandomMap = function (){
            return staticMap = {mapUrl: 'http://api.tiles.mapbox.com/v4/' + randomMap[randomMapId()] + '/' + randomLat() + ',' + randomLng() + ',' + randomZoom() + '/' + '1280x720.png?access_token=pk.eyJ1IjoicG9ldHNyb2NrIiwiYSI6Imc1b245cjAifQ.vwb579x58Ma-CcnfQNamiw'};

        }

    }
]);