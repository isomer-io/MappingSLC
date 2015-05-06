'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    request = require('request'),
    connectMongo = require('connect-mongo'),
    censusKey = require('./censusKey.js'),
    utah_census_lookup = require('./utah.json');


//http://developer.usatoday.com/docs/read/Census
//http://www.census.gov/acs/www/data_documentation/summary_file/
//http://api.census.gov/data.html
//


////make call to census api
var censusDataVariable = ['P0010001'],
    censusYear = [2000, 2010, 2011, 2012, 2013, 2014],
    censusType = ['sf1', 'acs'],
    censusApiResultData = null;


//need to add logic to first look up local instance of Census Data Model to determine whether data is already available
//if not then invoke callCensusApi function

//make get request to census api
function callCensusApi(censusKey) {
    var query = 'http://api.census.gov/data/' + censusYear[1] + '/' + censusType[0] + '?get=' + censusDataVariable[0] + '&for=tract:*&in=state:49+county:035&key=' + censusKey;
    request(query,
        function (error, response, body) {
            console.log('censusData: ', censusData);

            // Create new Census Data Document
            body.create = function () {

                // Create new Census Data object
                var censusDataDocument = new CensusDataDocuments({
                    censusData: this.censusData
                });

                var saveProject = function () {
                    censusDataDocument.$save(function (response) {
                        $location.path('censusDataDocuments/' + response._id);
                    }, function (errorResponse) {
                        response.error = errorResponse.data.message;

                    });
                };

                saveProject();
            };
        })
}


//front end $http service should make a call and pass in a string based on user request for particular census data set.
// e.g., $http.get('/census-data', 'P0010001') would hit 'census-data' end point and would query for total population
//assumptions: data for all tracts is returned, and only returned for tracts in Salt Lake County, UT.
var censusVars = {};
var getCensusVars = function () {
    return censusVars;
};

var storedLocal = {};
// Object 'storedLocal' is the object param that, if found in the census data model, will confirm
// the user-requested data is available locally and when passed in as a condition, will return true
// if something is found; else will evaluate to false.  if true, retrieve data; else, call census api to retrieve
//data.
if (storedLocal) {
    //retrieve locally stored census data that meets the request
} else {
    var query = 'http://api.census.gov/data/' + censusYear[1] + '/' + censusType + '?get=' + censusDataVariable[0] + '&for=tract:*&in=state:49+county:035&key=' + censusKey;
    //example url 'http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316';
    request(query, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                res.jsonp(body);
                var censusResults = body;
                console.log('Success! Response & Body', response, body);
                //need to add code that saves this data into the censusData object for future use
            } else {
                console.log('ERROR! Error, response & body', error, response, body);
            }
        }
    )
}


var censusDataKey = ['P0010001'];
var censusYear = [1990, 2000, 2010, 2011, 2012, 2013, 2014];

$http.get('http://api.census.gov/data/' + censusYear[1] + '/sf1?get=' + censusDataKey[0] + '&for=tract:*&in=state:49+county:035&key=' + censusKey)
    .success(function (censusData) {
        for (var i = 0; i < censusData.length; i++) {
            //censusPopulationData(censusData);
            $scope.getCensusData += $scope.getCensusData;
            console.log('.map censusData: ', censusData[i]);
        }
    })
    .error(function (censusDataError, status) {
        $scope.censusData = censusDataError || 'Request failed';
        $scope.status = status;
    });
//http://api.census.gov/data/2010/sf1/variables.html#

// BEGINNING OF Census Data Routes
app.route('/census-data')
    .get(function (req, res) {
        var query = 'http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316';
        request(query,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    res.jsonp(body);
                    var censusResults = body;
                    console.log('Success! Response & Body', response, body);
                } else {
                    console.log('ERROR! Error, response & body', error, response, body);
                }
            }
        )
    });

