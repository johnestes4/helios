//= require angular
//= require angular-resource

"use strict";
console.log("maps.js has been called")

(function() {
    angular
        .module("heatMap", [

        ])
        .controller("map_controller", [

            MapController
        ]);

    function MapController($resource) {
        console.log("MapController has been called");
        var vm = this;

    }

}());