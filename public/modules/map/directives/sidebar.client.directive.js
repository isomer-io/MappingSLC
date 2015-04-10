'use strict';

angular.module('map').directive('sidebarDirective', [
	function() {
        return {
            templateUrl: '/modules/map/directives/views/sidebar-directive.html',
            restrict: 'E'
            //compile: function(){
                //var sidePop = L.mapbox.featureLayer({
                //    // this feature is in the GeoJSON format: see geojson.org
                //    // for the full specification
                //    type: 'Feature',
                //    geometry: {
                //        type: 'Point',
                //        // coordinates here are in longitude, latitude order because
                //        // x, y is the standard for GeoJSON and many formats
                //        coordinates: [
                //            -111.702,
                //            40.773
                //        ]
                //    },
                //    properties: {
                //        title: 'Peregrine The Espresso',
                //        description: '1718 14th St NW, Washington, DC',
                //        // one can customize markers by adding simplestyle properties
                //        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                //        'marker-size': 'large',
                //        'marker-color': '#BE9A6B',
                //        'marker-symbol': 'cafe'
                //    }
                //});
                //console.log('sidePop: ', sidePop);
                //var sidebar = L.control.sidebar('sidebar', {
                //    closeButton: true,
                //    position: 'right'
                //});
                //map.addControl(sidebar);
            //}

            //link: function(){
            //    sidePop.on('click', function () {
            //
            //        //$scope.$apply(
            //        //    function(){
            //        //        $scope.toggleDetails = !$scope.toggleDetails;
            //        //    }
            //        //);
            //        sidebar.setContent('test <b>test</b> test');
            //
            //        setTimeout(function () {
            //            sidebar.toggle();
            //        }, 500);
            //
            //    }).addTo(map);
            //}
        }
    }
]);