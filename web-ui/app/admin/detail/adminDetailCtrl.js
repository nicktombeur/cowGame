define(['angular', 'app.ctrl', 'jquery'], function (angular, ctrls, $) {

    var injectParams = ['$scope', '$routeParams','adminDetailService'];


   var adminController =  function ($scope,$routeParams,adminDetailService) {
       var vm = this;

       $('.modal-trigger').leanModal();

       $('.modal').leanModal({
               dismissible: true, // Modal can be dismissed by clicking outside of the modal
               opacity: .5, // Opacity of modal background
               in_duration: 300, // Transition in duration
               out_duration: 200 // Transition out duration
           }
       );

       if($routeParams.id){
           vm.mode = "edit";
           vm.event = adminDetailService.getGame($routeParams.id)
       }else{
           vm.mode = "create";
           vm.event = {};
       }

    };

    adminController.$inject = injectParams;

    ctrls.controller('AdminDetailController',adminController);

});