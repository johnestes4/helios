console.log("maps.js has been called")

// Include angular dependencies
//= require angular
//= require angular-resource

"use strict";

(function() {
    console.log("IIFE in maps.js has been called");
    angular
        .module("heatMap", [
            "ngResource"
        ])
        .controller("map_controller", [
            "$resource",
            MapController
        ]);

    function MapController($resource) {
        console.log("MapController has been called");
        var vm = this;

    }

}());