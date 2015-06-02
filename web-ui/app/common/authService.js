'use strict';

define(['app.module'], function (app) {

    var injectParams = ['$http', '$rootScope'];

    var authFactory = function ($http, $rootScope) {
        var serviceBase = '/api/login/',
            factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null
                }
            };

        factory.login = function (email, password) {
            changeAuth(true);
            return true;
        };

        factory.logout = function () {
            changeAuth(false);
            return false;
        };

        factory.redirectToLogin = function () {
            $rootScope.$broadcast('redirectToLogin', null);
        };

        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = injectParams;

    app.factory('authService', authFactory);

});
