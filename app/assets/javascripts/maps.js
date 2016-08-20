//= require angular
//= require angular-resource

"use strict";

(function(){
    console.log('Whats up')
    angular
    .module("heatMap", [
        "ngResource"
    ])
    .controller("mapsController", [
        "$resource",
        mapsController
    ]);
    function mapsController($resource){
        console.log('Where the bitches at')
    }
})();
