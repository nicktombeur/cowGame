'use strict';

define(['app.module'], function(app) {
    return app.config(['$routeProvider', '$locationProvider','routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, $locationProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide) {

            /**
             * override angular default module api for creating components
             * @type {Function|register|register|register}
             */
            app.controller = $controllerProvider.register;
            app.service = $provide.service;
            app.factory = $provide.factory;
            app.filter = $filterProvider.register;
            app.directive = $compileProvider.directive;

            routeResolverProvider.routeConfig.setViewsDirectory("/app");

            /**
             * get referance to the route method of routeResolverProvider
             * @type {*}
             */
            var route = routeResolverProvider.route;

            $locationProvider.html5Mode(false);

            $routeProvider
                .when('/', route.resolve('index',[]))
                .when('/game', route.resolve('cow',['cowService']))
                .otherwise({
                    redirectTo: '/'
                });
    }]);
});