//= require angular
//= require angular-resource
//= require lodash
//= require angular-google-maps
//= require angular-simple-logger

"use strict";

(function(){
    angular
    .module("heatMap", [
        "ngResource",
        'uiGmapgoogle-maps'
    ])
    .controller("maps_controller", function($scope, uiGmapGoogleMapApi, $resource) {
      var vm = this;
      var Map = $resource("/maps.json", {}, {
        update: {method: "PUT"}
      });
      vm.data = Map.query();
      $scope.points = [
      ];
      function getPoints() {
        return $scope.points;
      };
      function dummyPoints() {
        $scope.points.push(new google.maps.LatLng(38.902551, -77.035368));
        $scope.points.push(new google.maps.LatLng(38.902745, -77.034586));
        $scope.points.push(new google.maps.LatLng(38.902842, -77.033688));
        $scope.points.push(new google.maps.LatLng(38.902919, -77.032815));
        $scope.points.push(new google.maps.LatLng(38.902992, -77.032112));
        $scope.points.push(new google.maps.LatLng(38.903100, -77.031461));
        $scope.points.push(new google.maps.LatLng(38.903206, -77.030829));
        $scope.points.push(new google.maps.LatLng(38.903273, -77.030324));
        $scope.points.push(new google.maps.LatLng(38.903316, -77.030023));
        $scope.points.push(new google.maps.LatLng(38.903357, -77.029794))
      }

      function createHeatLayer(heatLayer) {
        var pointArray = new google.maps.MVCArray($scope.points);
        heatLayer.setData(pointArray);
      };

      function updateHeat() {
        console.log(vm.data);
        var points = getPoints();
        for (var i = 0; i < vm.data.length; i++) {
          $scope.points.push(new google.maps.LatLng(vm.data[i].coordinates[0], vm.data[i].coordinates[1]));
        }
        var pointArray = new google.maps.MVCArray(points);
      };

      $scope.map = {
                  center: {
                  latitude: 38.907240,
                  longitude: -77.036591
                  },
                  showHeat: true,
                  zoom: 14,
                  heatLayerCallback: function (layer) {
                    dummyPoints();
                    $scope.layerInUse = layer;
                    //set the heat layers backend data
                    var heatLayer = new createHeatLayer(layer);
                  },
                  toggleHeat: function() {
                    this.showHeat = !this.showHeat;
                  },
                  log: function() {
                    console.log("YES")
                  },
                  updateHeatLayer: function(newLat, newLong) {
                    updateHeat(newLat, newLong);
                    var layer = document.getElementById("layerInUse");
                    var heatLayer = new createHeatLayer($scope.layerInUse);
                  }
              };
      uiGmapGoogleMapApi.then(function(maps) {

      });
    })
    .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyBUDVYPfMdmQH8NDwR7eOuWV18J-ckFaQk',
          v: '3.24', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
    });

    function getAllPoints() {
        var latLongObjArray = []
        Map
    }
})();
