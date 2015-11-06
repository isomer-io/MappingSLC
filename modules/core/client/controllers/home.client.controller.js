'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'ApiKeys', '$http', 'MarkerDataService', 'mapService', 'AdminAuthService', '$rootScope', '$location', '$sce', 'UtilsService',
  function ($scope, Authentication, ApiKeys, $http, MarkerDataService, mapService, AdminAuthService, $rootScope, $location, $sce, UtilsService) {

    $scope.authentication = Authentication;
    $scope.isAdmin = AdminAuthService;

    //for overlay
    $scope.featuredProjects = {};

    //provides logic for the css in the forms
    UtilsService.cssLayout();

    //menu functions
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.goToProject = function (id) {
      $location.path('projects/' + id);
    };

    //placeholder for featured projects images
    //todo once admin module is built, create a function that makes photo1 and 2 dynamic rather than hard-coded
    $scope.photo0 = 'chris--bw-2.jpg';
    $scope.photo1 = 'as_thumb_150.jpg';
    $scope.photo2 = 'wli_thumb_150.jpg';
    $scope.photo3 = 'dw_thumb_150.jpg';
    $scope.photo4 = 'as_thumb_bw.png';

    $scope.projectMarker = null;
    $scope.markerData = null;



    /**
     *
     * Animation Functionality
     *
     **/

    $scope.overlayActive = true;
    $scope.menuOpen = false;
    var changeMapFrom = null;

    $scope.toggleOverlayFunction = function (source) {
      if ($scope.overlayActive && source === 'overlay') {
        $scope.overlayActive = !$scope.overlayActive;
        changeMapFrom('gray-map');
      } else if ($scope.overlayActive && source === 'menu-closed') {
        $scope.overlayActive = false;
        $scope.menuOpen = true;
        changeMapFrom('gray-map');
      } else if (!$scope.overlayActive && source === 'menu-closed' && !$scope.menuOpen) {
        $scope.menuOpen = !$scope.menuOpen;
      } else if (!$scope.overlayActive && source === 'home') {
        $scope.menuOpen = false;
        $scope.overlayActive = true;
      }
    };

    //atrribution toggle
    $scope.attributionFull = false;
    $scope.attributionText = '<div style="padding: 0 5px 0 2px"><a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> & <a href="http://leafletjs.com/" target="_blank">Leaflet</a>, with map data by <a href="http://openstreetmap.org/copyright">OpenStreetMap©</a> | <a href="http://mapbox.com/map-feedback/" class="mapbox-improve-map">Improve this map</a></div>';

    /**
     *
     * Map Functionality
     *
     **/

    $scope.markers = true;
    $scope.filters = true;
    $scope.censusDataTractLayer = true;
    $scope.googlePlacesLayer = false;
    //$scope.toggleProjectDetails = false;
    $scope.sidebarToggle = false;


    //service that returns api keys
    ApiKeys.getApiKeys()
      .success(function (data) {
        mapFunction(data.mapboxKey, data.mapboxSecret);
      })
      .error(function (data, status) {
        alert('Failed to load Mapbox API key. Status: ' + status);
      });

    var popupIndex = 0;

//
// call map and add functionality
//


    var mapFunction = function (key, accessToken) {
      //creates a Mapbox Map
      L.mapbox.accessToken = accessToken;

      //'info' id is part of creating tooltip with absolute position
      var info = document.getElementById('info');

      var map = L.mapbox.map('map', null, {
          infoControl: false, attributionControl: false
        })
        .setView([40.7630772, -111.8689467], 12)
        //allow users to share maps on social media
        .addControl(L.mapbox.shareControl())
        .addControl(L.mapbox.geocoderControl('mapbox.places'));

      var grayMap = L.mapbox.tileLayer('poetsrock.b06189bb'),
        mainMap = L.mapbox.tileLayer('poetsrock.la999il2'),
        topoMap = L.mapbox.tileLayer('poetsrock.la97f747'),
        greenMap = L.mapbox.tileLayer('poetsrock.jdgpalp2'),
        landscape = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'),
        comic = L.mapbox.tileLayer('poetsrock.23d30eb5'),
        watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png');

      var layers = {
        'Main Map': mainMap,
        'Topo Map': topoMap,
        'Green Map': greenMap,
        'Landscape': landscape,
        'Comically Yours': comic,
        'Gray Day': grayMap,
        'Watercolor': watercolor
      };

      grayMap.addTo(map);
      L.control.layers(layers).addTo(map);

      //var sidebar = L.control.sidebar('sidebar', {
      //	closeButton: true,
      //	position: 'left'
      //}).addTo(map);

      changeMapFrom = function (currentMap) {
        if (currentMap === 'gray-map') {
          map.addLayer(mainMap);
          map.removeLayer(grayMap);
        } else {
          map.addLayer(grayMap);
          map.removeLayer(mainMap);
        }
      };
      //var markers = new L.MarkerClusterGroup();
      //markers.addLayer(new L.Marker(getRandomLatLng(map)));
      //map.addLayer(markers);


      //service that returns project markers
      MarkerDataService.getMarkerData()
        .success(function (markerData) {
          //$scope.getProjectMarkers(markerData);
          $scope.addProjectMarkers(markerData);
        })
        .error(function (data, status) {
          alert('Failed to load project markers. Status: ' + status);
        });

      $scope.markerArray = [];

      //add markers from marker data
      $scope.addProjectMarkers = function (markerData) {
        $scope.markerData = markerData;
        var index = 0;


        //loop through markers array and return values for each property
        for (var prop in markerData) {

          $scope.projectMarker = L.mapbox.featureLayer({
              //var singleMarker = L.mapbox.featureLayer({
              // this feature is in the GeoJSON format: see geojson.org for full specs
              type: 'Feature',
              geometry: {
                type: 'Point',
                // coordinates here are in longitude, latitude order because
                // x, y is the standard for GeoJSON and many formats
                coordinates: [markerData[prop].lng, markerData[prop].lat]
              },
              properties: {
                // one can customize markers by adding simplestyle properties
                // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                'marker-size': 'large',
                'marker-color': mapService.markerColorFn(markerData, prop),
                //'marker-color': '#00ff00',
                'marker-symbol': 'heart',
                projectId: markerData[prop]._id,
                summary: markerData[prop].storySummary,
                title: markerData[prop].title,
                mainImage: markerData[prop].mainImage,
                category: markerData[prop].category,
                mapImage: markerData[prop].mapImage,
                lat: markerData[prop].lat,
                lng: markerData[prop].lng,
                published: markerData[prop].created,
                leafletId: null,
                arrayIndexId: index
              }
            })
            //create toogle for marker event that toggles sidebar on marker click
            .on('click', function (e) {
              $scope.$apply(function () {
                $scope.storyEvent = e.target._geojson.properties;
              });
              map.panTo(e.layer.getLatLng()); //	center the map when a project marker is clicked
              popupMenuToggle(e);
              return $scope.projectMarker[prop];
            });

          $scope.projectMarker.addTo(map);
          $scope.markerArray.push($scope.projectMarker);
          index++;
        }
        return $scope.markerArray;
      };
      //
      //var popupMenuToggle = function (e) {
      //  if (!$scope.menuOpen && popupIndex !== e.target._leaflet_id) {
      //    $scope.toggleOverlayFunction('menu-closed');
      //    //$scope.populateStorySummary($scope.projectDetails);
      //    sidebar.open('details');
      //    popupIndex = e.target._leaflet_id;
      //  } else if (!$scope.menuOpen && popupIndex === e.target._leaflet_id) {
      //    //$scope.populateStorySummary($scope.projectDetails);
      //  } else if ($scope.menuOpen && popupIndex !== e.target._leaflet_id) {
      //    //$scope.populateStorySummary($scope.projectDetails);
      //    sidebar.open('details');
      //    popupIndex = e.target._leaflet_id;
      //  } else if ($scope.menuOpen && popupIndex === e.target._leaflet_id) {
      //    sidebar.close();
      //    popupIndex = 0;
      //  }
      //};

      //style the polygon tracts
      var style = {
        'stroke': true,
        'clickable': true,
        'color': "#00D",
        'fillColor': "#00D",
        'weight': 1.0,
        'opacity': 0.2,
        'fillOpacity': 0.0,
        'className': ''  //String that sets custom class name on an element
      };
      var hoverStyle = {
        'color': "#00D",
        "fillOpacity": 0.5,
        'weight': 1.0,
        'opacity': 0.2,
        'className': ''  //String that sets custom class name on an element
      };

      var hoverOffset = new L.Point(30, -16);


      //create toggle/filter functionality for Census Tract Data

      $scope.toggleGooglePlacesData = function () {
        if ($scope.googlePlacesLayer) {
          map.removeLayer(googlePlacesMarkerLayer);
        } else {
          map.addLayer(googlePlacesMarkerLayer);
        }
      };

      map.on('click', function (e) {
        if ($scope.menuOpen) {
          sidebar.close();
        }
      });





      //projectMarker.on('click', function() {
      //	alert('yep!');
      //});

      $scope.getProjectMarkers = function (markerData) {
      };
      //var sidebar = L.control.sidebar('sidebar', {
      //  closeButton: true,
      //  position: 'left'
      //}).addTo(map);
    };






    var popupMenuToggle = function (e) {
      if (!$scope.menuOpen && popupIndex !== e.target._leaflet_id) {
        $scope.toggleOverlayFunction('menu-closed');
        //$scope.populateStorySummary($scope.projectDetails);
        sidebar.open('details');
        popupIndex = e.target._leaflet_id;
      } else if (!$scope.menuOpen && popupIndex === e.target._leaflet_id) {
        //$scope.populateStorySummary($scope.projectDetails);
      } else if ($scope.menuOpen && popupIndex !== e.target._leaflet_id) {
        //$scope.populateStorySummary($scope.projectDetails);
        sidebar.open('details');
        popupIndex = e.target._leaflet_id;
      } else if ($scope.menuOpen && popupIndex === e.target._leaflet_id) {
        sidebar.close();
        popupIndex = 0;
      }
    };
  }
]);
