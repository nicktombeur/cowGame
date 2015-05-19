'use strict';

define(['app.module','app.ctrl','app.services','index/indexCtrl','cow/cowCtrl','cow/cowService'], function(app) {
    return app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            //$locationProvider.html5Mode(true);

            $routeProvider
                .when('/', {
                    templateUrl: 'app/index/index.html',
                    controller: 'IndexController',
                    controllerAs: 'indexCtrl'
                })
                .when('/game', {
                    templateUrl: 'app/cow/cow.html',
                    controller: 'CowController',
                    controllerAs: 'cowCtrl'
                }).otherwise({
                    redirectTo: '/'
                });

    }]);
});