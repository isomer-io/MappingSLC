/**
 * Created by poetsrock on 11/6/14.
 */
// This provides Authentication context.
$scope.authentication = Authentication;
$scope.method = 'GET';
$scope.url = 'http://api.census.gov/data/2010/sf1?get=P0010001&for=tract:*&in=state:49+county:035&key=4d396163ae90829a66916a08b3af462608c87316';

/**
 ** make the api call
 **/
$http({method: $scope.method, url: $scope.url, cache: $templateCache}).
    success(function (data, status, headers, config) {
        $scope.status = status;
        $scope.data = data;
        var i;
        for (i = 0; i < data.length; i++) {
            console.log(data[i]);
        }
        console.log(status);
        console.log(headers);
        console.log(headers.length);
        console.log(config);

    }).
    error(function (data, status) {
        $scope.data = data || 'Request failed';
        $scope.status = status;
    });
