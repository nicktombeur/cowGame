define(['angular', 'app.ctrl', 'jquery'], function (angular, ctrls, $) {

    var injectParams = ['$scope', 'adminDetailService'];


   var adminController =  function ($scope,adminDetailService) {
        var vm = this;

    };

    adminController.$inject = injectParams;

    ctrls.controller('AdminDetailController',adminController);

});