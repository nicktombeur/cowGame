define(['angular', 'app.ctrl', 'jquery','pdfMake'], function (angular, ctrls, $,pdfMake) {

    var injectParams = ['$scope', '$routeParams','adminDetailService'];


   var adminController =  function ($scope,$routeParams,adminDetailService) {
       var vm = this;

       if($routeParams.id){
           vm.title = "Edit event";
           vm.event = adminDetailService.getGame($routeParams.id)
       }else{
           vm.title = "Create event";
           vm.event = {};
       }

       vm.gridOptions = {
           columnDefs: [
               { field: 'name' ,width: '200' },
               { field: 'email',width: '200'  },
               { field: 'telephone' ,width: '150' },
               { field: 'jobInterest',width: '600' }
           ],
           enableGridMenu: true,
           enableSelectAll: true,
           exporterCsvFilename: 'myFile.csv',
           exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
           exporterPdfHeader: { text: "New members", style: 'headerStyle' },
           exporterPdfFooter: function ( currentPage, pageCount ) {
               return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
           },
           exporterPdfCustomFormatter: function ( docDefinition ) {
               docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
               docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
               return docDefinition;
           },
           exporterPdfOrientation: 'landscape',
           exporterPdfPageSize: 'LETTER',
           exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
           onRegisterApi: function(gridApi){
               vm.gridApi = gridApi;
           }
       };

       vm.gridOptions.data = adminDetailService.getGame($routeParams.id).newMembers;



       vm.export = function(){
           if (vm.export_format == 'csv') {
               var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
               vm.gridApi.exporter.csvExport( vm.export_row_type, vm.export_column_type, myElement );
           } else if (vm.export_format == 'pdf') {
               vm.gridApi.exporter.pdfExport( vm.export_row_type, vm.export_column_type );
           }
       };


    };

    adminController.$inject = injectParams;

    ctrls.controller('AdminDetailController',adminController);

});