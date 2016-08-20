//= require angular
//= require angular-resource
"use strict";

(function(){
    console.log('fireaway')
    angular
    .module("heatMap", [
        "ngResource"
    ])
    .controller("maps_controller", [
        "$resource",
        MapsController
    ]);
    function MapsController($resource){
        var vm = this;
        vm.total_value = function(){
            return 5+5
        }
    }
})();
