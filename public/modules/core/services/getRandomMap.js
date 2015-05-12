'use strict';

angular.module('core').service('RandomMapService', [
    function () {
        
        var staticMap = null;
        
        var maps = {
            'mapbox': {
                'originalMap': 'poetsrock.55znsh8b',
                'grayMap': 'poetsrock.b06189bb',
                'mainMap': 'poetsrock.la999il2',
                'topoMap': 'poetsrock.la97f747',
                'greenMap': 'poetsrock.jdgpalp2',
                'comic': 'poetsrock.23d30eb5'
            },
            'thunderforest': {
                'landscape': 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
            },
            'stamen': {
                'watercolor': 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
                'toner': 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
            }
        };
        
        var url = {
            'mapbox': 'http://api.tiles.mapbox.com/v4',
            'thunderforest': 'http://{s}.tile.thunderforest.com',
            'stamen': 'http://maps.stamen.com/m2i/',
            'ngs': ''
        };
        
        //array of
        var randomMap = [
            ['mapbox', maps.mapbox.originalMap],
            ['mapbox', maps.mapbox.grayMap],
            ['mapbox', maps.mapbox.mainMap],
            ['mapbox', maps.mapbox.topoMap],
            ['mapbox', maps.mapbox.greenMap],
            ['mapbox', maps.mapbox.comic],
            ['stamen', maps.stamen.watercolor],
            ['stamen', maps.stamen.toner],
            ['thunderforest', maps.thunderforest.landscape]
        ];
        
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

        var randomZoom = function () {
            return Math.floor(getRandomArbitrary(9, 16));
        };
        
        this.getRandomMap = function () {
            var randomNum = Math.floor(getRandomArbitrary(0, 8));
            var mapVendor = randomMap[randomNum][0];
            var randomMapId = randomMap[randomNum][1];

            if (mapVendor === 'mapbox') {
                return staticMap = {mapUrl: url.mapbox + '/' + randomMapId + '/' + randomLat() + ',' + randomLng() + ',' + randomZoom() + '/' + '1280x720.png?access_token=pk.eyJ1IjoicG9ldHNyb2NrIiwiYSI6Imc1b245cjAifQ.vwb579x58Ma-CcnfQNamiw'};
            //}else if (mapVendor === 'thunderforest') {
            //    return return staticMap = {mapUrl: url.thunderforest + '/' + randomMapId + '/'};
            } else if (mapVendor === 'stamen') {
                return staticMap = {mapUrl: url.stamen + '/#watercolor' + '1280x720/' + randomZoom() + '/' + randomLat() + '/' + randomLng()};
            } else {
                console.log('Error!\nrandomNum: ', randomNum, '\nmapVendor', mapVendor, '\nrandomMapId: ', randomMapId );
            }
        }
        
    }
]);