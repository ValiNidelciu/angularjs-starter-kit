(function() {
    'use strict';

    angular.module('vapp.station',[]).config(config);
    

    function config($stateProvider){
        $stateProvider
                .state("station",{
                    url:"/stations",
                    templateUrl:"/app/modules/stations/station.html",
                    controller:"StationController as vm"    
                })
    }
})();