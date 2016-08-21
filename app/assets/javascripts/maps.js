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

      // Initialize points. $scope.points will hold all of the google maps
      //   latlng objects to be rendered on the map
      $scope.points = [
      ];

      // Returns the full array of google maps latlng objects being displayed
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


    function filterTweets(tweet_array, search_term) {
        // TODO Implement this with object oriented tweet objects
        /* Takes in an array of tweets and a search term and returns
         *   an array of tweets with hashtags that match the search.
         * Parameters:
         *   tweet_array: An array of dictionaries. Each dictionary contains
         *                the following key value pairs:
         *                  latitude: (string)
         *                  longitude: (string)
         *                  hashtags: (array of strings)
         *   search_term: (string)*
         * Returns: A tweet array in the same form as above.
         */

        // If the search term is an empty string, return the original array
        if (search_term.trim() == "") {
          return tweet_array
        }

        // If the search term is not empty
        var result_tweet_array = [];
        for (var i = 0; i < tweet_array.length; i++) {
          // Check if the trimmed search term is in the hashtag array
          if (tweet_array[i].hashtags.indexOf(search_term.trim()) != -1) {
                result_tweet_array.push(tweet_array[i]);
            }
        }
        return result_tweet_array;
    }
})();
