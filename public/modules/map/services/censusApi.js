var getCensusData = function() {
    $http.get('http://api.census.gov/data/2010/sf1?get=' + dataToReturn.population + '&for=tract:*&in=state:49+county:035&key=' + censusKey)
        .success(function (data, status) {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
            }
            console.log(status);
        })
        .error(function (data, status) {
            alert('Failed to get the census data. We got the following status: ' + status);
        });
};