'use strict';

define(['app.module','app.ctrl','index/indexCtrl'], function(app) {
    return app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider
                .when('/', {
                    templateUrl: 'app/index/index.html',
                    controller: 'IndexController',
                    controllerAs: 'indexCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);
});