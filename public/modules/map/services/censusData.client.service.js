'use strict';

angular.module('map').service('CensusDataService', ['$http',
    function ($http) {

        //Census Data for Population Stats service logic

        this.callCensusApi = function () {

            return $http.get('http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316').
                success(function (censusData) {
                    var i;
                    for (i = 0; i < censusData.length; i++) {
                        //console.log('census data: ', censusData[i]);
                    }
                }).
                error(function (censusDataError, status) {
                    $scope.censusData = censusDataError || 'Request failed';
                    $scope.status = status;
                });
        };

    }
]);

