define(['angular', 'app.ctrl', 'jquery'], function (angular, ctrls, $) {

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

    };

    adminController.$inject = injectParams;

    ctrls.controller('AdminDetailController',adminController);

});