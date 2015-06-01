define(['angular', 'app.ctrl', 'jquery'], function (angular, ctrls, $) {

    ctrls.controller('AdminController', ['$scope', 'adminService', function ($scope,adminService) {
        var vm = this;

        vm.games = adminService.getGames();

    }]);


});