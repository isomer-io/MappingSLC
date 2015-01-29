
var geo = require('geo');
var address = '454 West 3rd Avenue, SLC UT';
var sensor = false;

geo.geocoder(geo.google, address, sensor,
    function(formattedAddress, latitude, longitude, details) {
        console.log("Formatted Address: " + formattedAddress);
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
        console.log("Address details:", details);
    });

