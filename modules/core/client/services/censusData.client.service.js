'use strict';

angular.module('core').service('CensusDataService', ['$http', 'ApiKeys',
    function ($http, ApiKeys) {

        //Census Data for Population Stats service logic

        var censusData = null;
        var censusDataKey = 'P0010001';
        var censusYear = [2000, 2010, 2011, 2012, 2013, 2014];
        var population = '';

        this.callCensusApi = function () {
            ApiKeys.getApiKeys()
                .success(function (data) {
                    censusData(data.censusKey);
                })
                .error(function (data, status) {
                    alert('Failed to load Mapbox API key. Status: ' + status);
                });

            censusData = function (censusKey){
                return $http.get('http://api.census.gov/data/' + censusYear[1] + '/sf1?get=' + population + '&for=tract:*&in=state:49+county:035&key=' + censusKey);
            }
        };
    }
]);

