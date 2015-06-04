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

        factory.authorize = function (loginRequired, requiredPermissions, permissionCheckType) {
            var result = 'authorised',
                loweredPermissions = [],
                user = this.user,
                hasPermission = true,
                permission, i;

            permissionCheckType = permissionCheckType || 'atLeastOne';
            if (loginRequired === true && !user.isAuthenticated) {
                result = 'loginRequired';
            } else if ((loginRequired === true && !user.isAuthenticated) &&
                (requiredPermissions === undefined || requiredPermissions.length === 0)) {
                // Login is required but no specific permissions are specified.
                result = 'authorised';
            } else if (requiredPermissions) {
                loweredPermissions = [];
                angular.forEach(user.permissions, function (permission) {
                    loweredPermissions.push(permission.toLowerCase());
                });

                for (i = 0; i < requiredPermissions.length; i += 1) {
                    permission = requiredPermissions[i].toLowerCase();

                    if (permissionCheckType === 'combinationRequired') {
                        if(hasPermission && loweredPermissions.indexOf(permission) > -1){
                            hasPermission = true;
                        }else{
                            hasPermission = false;
                        }
                        // if all the permissions are required and hasPermission is false there is no point carrying on
                        if (hasPermission === false) {
                            break;
                        }
                    } else if (permissionCheckType === 'atLeastOne') {
                        if(loweredPermissions.indexOf(permission) > -1){
                            hasPermission = true;
                        }else{
                            hasPermission = false;
                        }
                        // if we only need one of the permissions and we have it there is no point carrying on
                        if (hasPermission) {
                            break;
                        }
                    }
                }

                result = hasPermission ?
                    'authorised' :
                    'notAuthorised';
            }

            return result;
        };

        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            factory.user.permissions = ['Admin', 'debug'];
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = injectParams;

    app.factory('authService', authFactory);

});
