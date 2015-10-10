define(['app.service'], function (services) {

    var injectParams = ['$resource','API_URL'];

    var adminDetailService = function ($resource,API_URL) {
        return $resource(API_URL + "/api/event/:event",{event:"@event"},{
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        })
    };


    adminDetailService.$inject = injectParams;

    services.factory('Event', adminDetailService);
});