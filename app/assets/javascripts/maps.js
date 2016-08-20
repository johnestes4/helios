//= require angular
//= require angular-resource

"use strict";

(function(){
    angular
    .module("heatMap", [
        "ngResource"
    ])
    .controller("mapsController", [
        "$resource",
        InventoryControllerFunction
    ]);
    function InventoryControllerFunction($resource){
        console.log('I am here Brotha!')
    }
})();
