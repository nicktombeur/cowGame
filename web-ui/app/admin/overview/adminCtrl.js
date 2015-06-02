define(['angular', 'app.ctrl', 'jquery'], function (angular, ctrls, $) {

    var injectParams = ['$scope', 'adminService'];

    var adminController = function ($scope,adminService) {
        var vm = this;

        vm.games = adminService.getGames();

    };

    adminController.$inject = injectParams;

    ctrls.register.controller('AdminController', adminController);

});