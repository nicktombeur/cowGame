'use strict';

define([
    'app.module'
], function(angular) {
    return angular.config(['$routeProvider', '$locationProvider',
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