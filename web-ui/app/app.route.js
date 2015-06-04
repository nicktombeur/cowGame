'use strict';

define(['app.module'], function (app) {
    return app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', '$httpProvider',

        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $httpProvider) {

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            routeResolverProvider.routeConfig.setViewsDirectory("/app");

            /**
             * get referance to the route method of routeResolverProvider
             * @type {*}
             */
            var route = routeResolverProvider.route;

            $routeProvider
                .when('/', route.resolve({
                    name: 'index'
                }))
                .when('/game', route.resolve({
                    name: 'cow',
                    services: ['cowServices']
                }))
                .when('/admin', route.resolve({
                    name: 'admin',
                    services: ['adminServices'],
                    path: 'admin/overview'
                }))
                .when('/admin/edit/:id', route.resolve({
                    name: 'adminDetail',
                    services: ['adminDetailServices'],
                    secured: true,
                    path: 'admin/detail'
                }))
                .when('/login/:redirect*?', route.resolve({
                    name: 'login'
                }))
                .otherwise({
                    redirectTo: '/'
                });
        }])
        .run(['$rootScope', '$location', 'authService',
            function ($rootScope, $location, authService) {

                //Client-side security. Server-side framework MUST add it's
                //own security as well since client-based security is easily hacked
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    if (next && next.$$route && next.$$route.secure) {
                        if (!authService.user.isAuthenticated) {
                            $rootScope.$evalAsync(function () {
                                authService.redirectToLogin();
                            });
                        }
                    }
                });

            }]);
});