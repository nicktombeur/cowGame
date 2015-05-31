define(['app.service'], function (services) {
    services.factory('adminService', ["$http", function ($http) {
        return {
            getSelectedCubesHTTP: function (gameId) {
                return $http.get('/api/v1/admin/' + gameId)
                    .then(
                    function (response) {
                        return {
                            title: response.data.title,
                            cost: response.data.price
                        };
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + " : " +
                        httpError.data;
                    });
            }
        }
    }]);
});