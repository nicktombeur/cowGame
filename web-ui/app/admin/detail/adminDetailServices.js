define(['app.service'], function (services) {

    var injectParams = ['$http'];

    var adminDetailService = function ($http) {
        return {}
    };


    adminDetailService.$inject = injectParams;

    services.factory('adminDetailService', adminDetailService);
});