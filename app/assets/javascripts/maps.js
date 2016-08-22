//= require angular
//= require angular-resource
//= require lodash
//= require angular-google-maps
//= require angular-simple-logger
//= require jquery
//= require html2canvas

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
      // vm.data holds all of the tweets in the database
      vm.data = Map.query();

      // Initialize points. $scope.points will hold all of the filtered google maps
      //   latlng objects to be rendered on the map.
      $scope.points = [
      ];
      // Initialize allPoints. This will hold ALL of the possible tweets to be rendered
      //   and will be used to inform $scope.points
      $scope.allTweets = Map.query();

      // Returns the full array of google maps latlng objects being displayed
      function getPoints() {
        return $scope.points;
      };

      function setUpDummyTweets() {
        // TODO Implement this with object oriented tweets
        var dummy_tweets = [
          {
            latitude: "38.902551",
            longitude: "-77.035368",
            hashtags: ["this", "that"]
          },
          {
            latitude: "38.902745",
            longitude: "-77.034586",
            hashtags: ["foo", "fum"]
          },
          {
            latitude: "38.902951",
            longitude: "-77.033368",
            hashtags: ["panda", "that"]
          },
          {
            latitude: "38.903145",
            longitude: "-77.032586",
            hashtags: ["ron", "howard"]
          },
          {
            latitude: "38.903351",
            longitude: "-77.031368",
            hashtags: ["angular", "schmangular"]
          },
          {
            latitude: "38.903545",
            longitude: "-77.030586",
            hashtags: ["ruby", "fum", "this"]
          },
        ]
      }
      function createHeatLayer(heatLayer) {
        var pointArray = new google.maps.MVCArray($scope.points);
        heat = heatLayer;
        heatLayer.setData(pointArray);
      };

// // Now that this is integrated into createHeatLayer, we don't need the specific function anymore
//       function updateHeat() {
//         /* Adds
//         * */
//         console.log(vm.data);
//         // Get all of the points currently being rendered
//         var points = getPoints();
//
//         // Iterate through all tweets in the DB and push each one into the array being rendered
//         // for (var i = 0; i < vm.data.length; i++) {
//         //   $scope.points.push(new google.maps.LatLng(vm.data[i].coordinates[0], vm.data[i].coordinates[1]));
//         // }
//         // Nothing happens with this??
//         var pointArray = new google.maps.MVCArray(points);
//       };

      // Set up the google map
      $scope.map = {
                  center: {
                  latitude: 40.907240,
                  longitude: -75.036591
                  },
                  showHeat: true,
                  zoom: 10,
                  radius: 10,
                  opacity: .6,

                  heatLayerCallback: function (layer) {
                    // Add the dummy points
                    // dummyPoints();
                    populateFilteredTweets($scope, "");
                    console.log("scope.points from outside fn");
                    $scope.layerInUse = layer;
                    //set the heat layers backend data
                    var heatLayer = new createHeatLayer(layer);
                  },

                  toggleHeat: function() {
                    this.showHeat = !this.showHeat;
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
                  },
                  changeRadius: function() {
                    heat.set('radius', this.radius);
                  },
                  changeOpacity: function() {
                    heat.set('opacity', this.opacity);
                  },

                  processFilter: function() {
                    var search_term = $("#filter-search-term").val();
                    populateFilteredTweets($scope, search_term);
                    var layer = document.getElementById("layerInUse");
                    var heatLayer = new createHeatLayer($scope.layerInUse);
                }
              };
              var onSuccess = function(position) {
               $scope.map.center = {
                   latitude: position.coords.latitude,
                   longitude: position.coords.longitude
               };
               $scope.$apply();
               console.log($scope.map.center);
           }
           function onError(error) {
              console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
            }
           navigator.geolocation.getCurrentPosition(onSuccess, onError);
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

    function oldFilterTweets(tweet_array, search_term) {
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
        if (search_term == "") {
          return tweet_array
        }
        // If the search term is not empty
        var result_tweet_array = [];
        for (var i = 0; i < tweet_array.length; i++) {
          // Check if the trimmed search term is in the hashtag array
          if (tweet_array[i].hashtags.indexOf(search_term) != -1) {
                result_tweet_array.push(tweet_array[i]);
            }
        }
        return result_tweet_array;
    }
    function populateFilteredTweets(scope, search_term) {
      //TODO   On take in of data and/or population of mock data, ensure that all hashtags are toLowerCase
      //TODO   then apply the same to the filter conditions. Otherwise, a query for '#xss' will return
      //TODO   no results when '#XSS' is extant.

      var filteredTweets = [];
      scope.points = [];

      // Get rid of leading or trailing whitespace
      search_term = search_term.trim();

      // If the search term is empty, we will show all tweets
      if (search_term == "") {
        filteredTweets = scope.allTweets;

      // Otherwise, filter the tweets.
      } else {

        for (var i = 0; i < scope.allTweets.length; i++) {
          // If the tweet has the given hashtag
          if (scope.allTweets[i].hashtag.indexOf(search_term) != -1) {
            // Get the coordinates
            filteredTweets.push(scope.allTweets[i]);
          }
        }
      }
      console.log(filteredTweets)

      // Create latlong objects with the filtered results
      for (var i = 0; i < filteredTweets.length; i++) {

        // Get the coordinates
        var lat = filteredTweets[i].coordinates[0];
        var long = filteredTweets[i].coordinates[1];
        var point_obj = new google.maps.LatLng(lat, long);

        // Push the new point object into scope.points
        scope.points.push(point_obj);
      }
    }
})();
