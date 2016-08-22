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
      var heat;
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
        for (var i = 0; i < vm.data.length; i++) {
          $scope.points.push(new google.maps.LatLng(vm.data[i].coordinates[0], vm.data[i].coordinates[1]));
        }

        var pointArray = new google.maps.MVCArray($scope.points);
        heat = heatLayer;
        heatLayer.setData(pointArray);
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
                  },
                  changeGradient: function() {
                    var gradient = [
                      'rgba(0, 255, 255, 0)',
                      'rgba(0, 255, 255, 1)',
                      'rgba(0, 191, 255, 1)',
                      'rgba(0, 127, 255, 1)',
                      'rgba(0, 63, 255, 1)',
                      'rgba(0, 0, 255, 1)',
                      'rgba(0, 0, 223, 1)',
                      'rgba(0, 0, 191, 1)',
                      'rgba(0, 0, 159, 1)',
                      'rgba(0, 0, 127, 1)',
                      'rgba(63, 0, 91, 1)',
                      'rgba(127, 0, 63, 1)',
                      'rgba(191, 0, 31, 1)',
                      'rgba(255, 0, 0, 1)'
                    ]
                    heat.set('gradient', heat.get('gradient') ? null : gradient);
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
