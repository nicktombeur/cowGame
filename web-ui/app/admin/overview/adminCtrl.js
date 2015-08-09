define(['angular', 'app.ctrl', 'jquery','admin/overview/adminServices'], function (angular, ctrls, $) {

    var injectParams = ['$scope', 'adminService'];

    var adminController = function ($scope,adminService) {
        var vm = this;

        vm.games = adminService.getMockGames();

    };

    adminController.$inject = injectParams;

    ctrls.controller('AdminController', adminController);

});