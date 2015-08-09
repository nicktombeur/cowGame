'use strict';

define(['app.module'], function (app) {

    var injectParams = ['$rootScope', '$q', '$window'];

    var authInterceptor =  function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'cow-' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    $rootScope.$broadcast('redirectToLogin', null);
                }
                return response || $q.when(response);
            }
        };
    };

    authInterceptor.$inject = injectParams;

    app.factory('authInterceptor', authInterceptor);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });


});
