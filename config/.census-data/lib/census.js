/**
 * Module dependencies.
 */
var http = require('http'),
    mongoose = require('mongoose'),
    request = require('request'),
    utah_census_lookup = require('./utah.json'),
    censusModel = require('./app/models/census-data.server.model.js');



//var callCensusApi = function(censusKey) {
//    var censusDataKey = ['P0010001'];
//    var censusYear = [2000, 2010, 2011, 2012, 2013, 2014];
//
//    $http.get('http://api.census.gov/data/' + censusYear[1] + '/sf1?get=' + censusDataKey[0] + '&for=tract:*&in=state:49+county:035&key=' + censusKey)
//        .success(function (censusData) {
//        for (var i = 0; i < censusData.length; i++) {
//            //censusPopulationData(censusData);
//            $scope.getCensusData += $scope.getCensusData;
//            console.log('map censusData: ', censusData[i]);
//        }
//    })
//        .error(function (censusDataError, status) {
//            $scope.censusData = censusDataError || 'Request failed';
//            $scope.status = status;
//        });
//};


// BEGINNING OF 2010 Census Data Routes
app.route('/census-data')
    .get(function (req, res) {
        var query = 'http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316';
        request(query,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    res.jsonp(body);
                    census2010Results = body;
                    console.log('Success! Response & Body', response, body);
                }else{
                    console.log('ERROR! Error, response & body', error, response, body);
                }
            }
        )
    });
//.post(users.requiresLogin, censusDatas.create);

app.route('/censusDatas/:censusDataId')
    .get(censusDatas.read)
    .put(users.requiresLogin, censusDatas.hasAuthorization, censusDatas.update)
    .delete(users.requiresLogin, censusDatas.hasAuthorization, censusDatas.delete);

// Finish by binding the Project middleware
app.param('censusDataId', censusDatas.censusDataByID);
// END OF 2010 Census Data Routes



