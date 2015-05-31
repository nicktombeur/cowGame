'use strict';

define(['app.module'], function(app) {
    return app.config(['$routeProvider', '$locationProvider','routeResolverProvider',
        function ($routeProvider, $locationProvider, routeResolverProvider) {

            routeResolverProvider.routeConfig.setViewsDirectory("/app");

            /**
             * get referance to the route method of routeResolverProvider
             * @type {*}
             */
            var route = routeResolverProvider.route;

            $locationProvider.html5Mode(false);

            $routeProvider
                .when('/', route.resolve('index',[]))
                .when('/game', route.resolve('cow',['cowServices']))
                .when('/admin', route.resolve('admin',['adminServices']))
                .otherwise({
                    redirectTo: '/'
                });
    }]);
});