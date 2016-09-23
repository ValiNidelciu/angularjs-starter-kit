(function() {
'use strict';

    angular
        .module('vapp.station')
        .factory('stationList', stationList);

    stationList.$inject = ['$http'];
    function stationList($http) {
        return{
            getStationByUser:getStationByUser,
            getStationById:getStationById,
            getChartDetailsById:getChartDetailsById
        }

        function getStationByUser(){
            return $http.get("http://192.168.1.133:8000/api.php?method=GetMyPowerStationByUser&username=demo").then(function(response){return response.data});

        };
        function getStationById(id){
            return $http.get("http://192.168.1.133:8000/api.php?method=GetMyDeviceListById&stationId="+id).then(function(response){return response.data});
        };
        function getChartDetailsById(id,queryType,date){
            return $http.get("http://192.168.1.133:8000/api.php?method=GetPowerBarChart&stationId="+id+"&queryType="+queryType+"&date="+date).then(function(response){return response.data})
        };
        
    }
})();