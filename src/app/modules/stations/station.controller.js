(function () {
    'use strict';

    angular
        .module('vapp.station')
        .controller('StationController', StationController);

    StationController.$inject = ['stationList','$interval']
    function StationController(stationList,$interval) {
        var vm = this;
        vm.list;
        stationList.getStationByUser().then(onReqComplete, onError);
        function onReqComplete(data) {
            vm.list = data
        };
        function onError() {
            alert("error")
        }



        var id = "";


        vm.showStations = function (x) {
            id = x.stationId;

            stationList.getStationById(id).then(onIdReqComplete, onError);


            function onIdReqComplete(data) {
                vm.stationDetails = data;

            }

            vm.show = true;
        }
        vm.showTable = true;

        //getting chart data s and default options

        vm.queryType = 0;
        vm.date = "2013-03-03";
        var series = [];
        var categories = [];
        var yearCategories = [];
        var dayCategories = [];


        var yearSeries = [];
        var monthSeries = [];
        var daySeries = [];





        vm.showHistoryF = function () {
            vm.showTable = false;
            vm.showHistory=true;

           stationList.getChartDetailsById(id, vm.queryType, vm.date).then(onChartReqComplete, onError)     

            function onChartReqComplete(data) {
                vm.chartDetails = data;



                //declaring some variable for the chart categories and series depending on the queryType


                //setting the series values from the api
                if (vm.queryType == 0) {
                    for (var x in vm.chartDetails) {
                        yearSeries.push(vm.chartDetails[x].YearEnergy);
                    };
                } else if (vm.queryType == 1) {
                    for (var y in vm.chartDetails) {
                        monthSeries.push(vm.chartDetails[y].MonthEnergy)
                    }
                } else if (vm.queryType == 2) {
                    for (var z in vm.chartDetails) {
                        daySeries.push(vm.chartDetails[z].DayEnergy)
                    }

                }








                //function to return the days of the current month
                function daysInMonth(month, year) {
                    return new Date(year, month, 0).getDate();
                }

                //generating years
                for (var i = 2012; i <= new Date().getFullYear(); i++) {
                    yearCategories.push(i);
                };

                //generating days
                var monthNo=daysInMonth(new Date().getFullYear())
                var yearNo=new Date().getMonth()
                for (var i = 1; i <= daysInMonth(monthNo, yearNo); i++) {
                    dayCategories.push(i);
                }


                if (vm.queryType == 0) {
                    categories = yearCategories;
                    series = yearSeries;
                } else if (vm.queryType == 1) {
                    categories = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    series = monthSeries;
                } else if (vm.queryType == 2) {
                    categories = dayCategories;
                    series = daySeries;
                }
                console.log(series);
                console.log(categories);
            };

        }


 




    function updateData(){    
        vm.dateFilterActive = false;
        vm.lineChart = {
            labels: categories,
            series: ['W'],
            data  : [
                series
                
            ]
        };
    }
    $interval(updateData, 1);
    }
})();