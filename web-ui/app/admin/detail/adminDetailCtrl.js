define(['angular', 'app.ctrl', 'jquery','pdfMake'], function (angular, ctrls, $,pdfMake) {

    var injectParams = ['$scope', '$routeParams','Event'];


   var adminController =  function ($scope,$routeParams,Event) {
       var vm = this;

       vm.gridOptions = {
           rowHeight:'auto',
           columnDefs: [
               { field: 'name' ,width: '200' },
               { field: 'email',width: '200'  },
               { field: 'telephone' ,width: '150' },
               { field: 'jobInterest',width: '300' }
           ],
           enableGridMenu: true,
           enableSelectAll: true,
           exporterCsvFilename: 'myFile.csv',
           exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
           onRegisterApi: function(gridApi){
               vm.gridApi = gridApi;
           }
       };


       if($routeParams.id){
           vm.title = "Edit event";
           vm.event = Event.get({event:$routeParams.id});
           vm.mode = "update";

           vm.gridOptions.data = vm.event.newMembers;

       }else{
           vm.mode = "create";

           vm.title = "Create event";
           vm.event = new Event();
           vm.event.image = "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg";
       }


       vm.export = function(){
           if (vm.export_format == 'csv') {
               var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
               vm.gridApi.exporter.csvExport( vm.export_row_type, vm.export_column_type, myElement );
           } else if (vm.export_format == 'pdf') {
               vm.gridApi.exporter.pdfExport( vm.export_row_type, vm.export_column_type );
           }
       };

       vm.submit = function(){
            if(vm.mode == "create"){
                vm.event.$save(function(){

                },function(error){
                    alert("Error saving");
                })
            }else{
                vm.event.$update(function(){

                },function(){
                    alert("Error saving");
                })
            }
       }

    };

    adminController.$inject = injectParams;

    ctrls.controller('AdminDetailController',adminController);

});