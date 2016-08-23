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
        var firstLoad = true;

        // vm.data holds all of the tweets in the database
        vm.data = Map.query();
        // Initialize points. $scope.points will hold all of the filtered google maps
        //   latlng objects to be rendered on the map.
        $scope.points = [

        ];
        // Initialize allPoints. This will hold ALL of the possible tweets to be rendered
        //   and will be used to inform $scope.points
        window.setInterval(function(){
            var Map = $resource("/maps.json", {}, {
                update: {method: "PUT"}
            });
            $scope.allTweets = Map.query();
            console.log('updated')
        }, 10000);
        $scope.allTweets = Map.query();
        // Returns the full array of google maps latlng objects being displayed

        function getPoints() {
            return $scope.points;
        };

        function createHeatLayer(heatLayer) {
            // Poplulate the heat map if this is the first pass through. If not, the filter has been applied.
            if (firstLoad == true) {
                firstLoad = false;
                for (var i = 0; i < vm.data.length; i++) {
                    $scope.points.push(new google.maps.LatLng(vm.data[i].coordinates[0], vm.data[i].coordinates[1]));
                }
            }
            var pointArray = new google.maps.MVCArray($scope.points);
            heat = heatLayer;
            heatLayer.setData(pointArray);
        };

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
                populateFilteredTweets($scope, "");
                console.log("scope.points from outside fn");
                $scope.layerInUse = layer;
                //set the heat layers backend data
                var heatLayer = new createHeatLayer(layer);
            },

            toggleHeat: function() {
                this.showHeat = !this.showHeat;
            },

            pushUpdates: function(){
                populateFilteredTweets($scope, "");
                var layer = document.getElementById("layerInUse");
                var heatLayer = new createHeatLayer($scope.layerInUse);
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
            },

            statusFilter: function() {
                var search_term = $("#filter-status-term").val();
                populateFilteredTweets($scope, search_term);
                var layer = document.getElementById("layerInUse");
                var heatLayer = new createHeatLayer($scope.layerInUse);
            },

            serveHashCount: function () {
                console.log("Sorting hashtags")
                var hashtag_dict = countHashtags($scope.allTweets);
                var hash_count_tuples = [];
                for (var key in hashtag_dict) hash_count_tuples.push([key, hashtag_dict[key]]);
                hash_count_tuples.sort(function(a, b) {
                    a = a[1];
                    b = b[1];
                    return a < b ? -1 : (a > b ? 1 : 0);
                });
                $('.hash-one').html('#' + hash_count_tuples[hash_count_tuples.length-1][0])
                $('.hash-two').html('#' + hash_count_tuples[hash_count_tuples.length-2][0])
                $('.hash-three').html('#' + hash_count_tuples[hash_count_tuples.length-3][0])
                $('.hash-four').html('#' + hash_count_tuples[hash_count_tuples.length-4][0])
                $('.hash-five').html('#' + hash_count_tuples[hash_count_tuples.length-5][0])
            },

            updateStatus: function(){
                console.log($scope.allTweets)
            }
        };

        var onSuccess = function(position) {
            $scope.map.center = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            $scope.$apply();
            console.log($scope.map.center);
        };

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

    function populateFilteredTweets(scope, search_term) {
      search_term = search_term.toLowerCase();

        var filteredTweets = [];
        scope.points = [];

        // Get rid of leading or trailing whitespace
        search_term = search_term.trim();
        // If the search term is empty, we will show all tweets
        if (search_term == "") {
            filteredTweets = scope.allTweets;
            // Otherwise, filter the tweets.
        } else {} else {
            for (var i = 0; i < scope.allTweets.length; i++) {
                // If the tweet has the given hashtag
                for (var j = 0; j < scope.allTweets[i].hashtag.length; j++) {
                  var hashToCheck = scope.allTweets[i].hashtag[j].toString();
                  if (search_term == hashToCheck.substr(0, search_term.length)) {
                    // Get the coordinates
                    filteredTweets.push(scope.allTweets[i]);
                  }
                }
            }
        }



        // Create latlong objects with the filtered result
        for (var i = 0; i < filteredTweets.length; i++) {
            // Get the coordinate
            var lat = filteredTweets[i].coordinates[0];
            var long = filteredTweets[i].coordinates[1];
            var point_obj = new google.maps.LatLng(lat, long);
            // Push the new point object into scope.points
            scope.points.push(point_obj);
        }
    }


    function populateFilteredTweetsByStatus(scope, search_term) {
        search_term = search_term.toLowerCase();

        var filteredTweets = [];
        scope.points = [];

        // Get rid of leading or trailing whitespace
        search_term = search_term.trim();
        // If the search term is empty, we will show all tweets
        if (search_term == "") {
            filteredTweets = scope.allTweets;
            // Otherwise, filter the tweets.

        } else {
            // For all tweets
            for (var i = 0; i < scope.allTweets.length; i++) {
                // If the tweet contains the given text
                var tweet_status = scope.allTweets[i].status.toString();
                if (tweet_status.indexOf(search_term) != -1) {
                    // Get the coordinates
                    console.log(scope.allTweets[i]);
                    filteredTweets.push(scope.allTweets[i]);
                }
            }
        }

        // Create latlong objects with the filtered result
        for (var i = 0; i < filteredTweets.length; i++) {
            // Get the coordinate
            var lat = filteredTweets[i].coordinates[0];
            var long = filteredTweets[i].coordinates[1];
            var point_obj = new google.maps.LatLng(lat, long);
            // Push the new point object into scope.points
            scope.points.push(point_obj);
        }
    }



    function countHashtags(all_tweets) {
        var counts = {}
        // For each tweet
        for (var i = 0; i < all_tweets.length; i++) {
            // For each hashtag
            for (var j = 0; j < all_tweets[i].hashtag.length; j++) {

                // If the hashtag is in the array, increment it
                var the_hashtag = all_tweets[i].hashtag[j];
                if (the_hashtag in counts) {
                    counts[the_hashtag] += 1;

                // If not, initialize it at 1
                } else {
                    counts[the_hashtag] = 1;
                }
            }
        }
        return counts;
    }
})();
