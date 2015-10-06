'use strict';

define(['app.module'], function (app) {
    return app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide','$logProvider',

        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide,$logProvider) {

            $logProvider.debugEnabled(true);

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
                    services: ['adminEventService'],
                    access: {
                        requiresLogin: true,
                        requiredPermissions: ['Admin'],
                        permissionType: routeResolverProvider.atLeastOne
                    },
                    path: 'admin/overview'
                }))
                .when('/admin/edit/:id', route.resolve({
                    name: 'adminDetail',
                    services: ['/admin/overview/adminEventService'],
                    path: 'admin/detail'
                }))
                .when('/admin/edit/', route.resolve({
                    name: 'adminDetail',
                    services: ['/admin/overview/adminEventService'],
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
                    if (next && next.$$route && next.$$route.access) {

                        var authorised;

                            authorised = authService.authorize(next.$$route.access.requiresLogin,
                                next.$$route.access.requiredPermissions,
                                next.$$route.access.permissionType);

                            if (authorised === 'loginRequired') {

                                $rootScope.$evalAsync(function () {
                                    authService.redirectToLogin();
                                });

                            } else if (authorised === 'notAuthorised') {
                                $rootScope.$evalAsync(function () {
                                    authService.redirectToLogin();
                                });
                            }
                        }

                });

            }]);
});