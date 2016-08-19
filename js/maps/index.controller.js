"use strict";

(function(){
  angular
  .module("maptime")
  .controller("mainController", function($scope, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []
    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    function MockHeatLayer(heatLayer) {
      // Adding 500 Data Points
      var map, pointarray, heatmap;

      var taxiData = [
          new google.maps.LatLng(37.782551, -122.445368),
          new google.maps.LatLng(37.782745, -122.444586),
          new google.maps.LatLng(37.782842, -122.443688),
          new google.maps.LatLng(37.782919, -122.442815),
          new google.maps.LatLng(37.782992, -122.442112),
          new google.maps.LatLng(37.783100, -122.441461),
          new google.maps.LatLng(37.783206, -122.440829),
          new google.maps.LatLng(37.783273, -122.440324),
          new google.maps.LatLng(37.783316, -122.440023),
          new google.maps.LatLng(37.783357, -122.439794),
          new google.maps.LatLng(37.783371, -122.439687)
      ];
      var pointArray = new google.maps.MVCArray(taxiData);
      heatLayer.setData(pointArray);
    };
    $scope.map = {
                center: {
                latitude: 37.782551,
                longitude: -122.445368
                },
                zoom: 12,
                heatLayerCallback: function (layer) {
                    //set the heat layers backend data
                    var mockHeatLayer = new MockHeatLayer(layer);
                    },
                showHeat: true
            };

    uiGmapGoogleMapApi.then(function(maps) {

    });
  });


}());
