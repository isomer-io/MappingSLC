'use strict';

angular.module('map').service('CensusDataService', ['$scope', '$http', '$templateCache',
    function($scope, $http) {
        // Census Data for Population Stats service logic
        // ...
        this.callCensusApi = function($scope, key, $templateCache){

            return $http.get('http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316').
                success(function (censusData, status, headers, config) {
                    $scope.status = status;
                    $scope.censusData = censusData;
                    var i;
                    for (i = 0; i < censusData.length; i++) {
                        console.log('census data: ', censusData[i]);
                    }
                    console.log(status);
                    console.log(headers);
                    console.log(headers.length);
                    console.log(config);

                }).
                error(function (censusDataError, status) {
                    $scope.censusData = censusDataError || 'Request failed';
                    $scope.status = status;
                });


        };

    }
]);

