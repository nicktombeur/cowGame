define(['angular', 'app.ctrl', 'jquery'], function (angular, ctrls, $) {

    var injectParams = ['$scope', 'Event','$log','COMMON_ERROR'];

    var adminController = function ($scope,Event,$log,COMMON_ERROR) {
        var vm = this;

        Event.query(function(data){
            vm.games = data
        },function(error){
            vm.error = COMMON_ERROR;
            $log.debug(error);
        });

    };

    adminController.$inject = injectParams;

    ctrls.controller('AdminController', adminController);

});