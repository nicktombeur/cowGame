'use strict';

define(['app.module'], function (app) {

    var injectParams = ['authService', '$rootScope'];

    var authDirective = function (authorization,$rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var makeVisible = function () {
                        element.show();
                    },
                    makeHidden = function () {
                        element.hide();
                    },
                    determineVisibility = function (resetFirst) {
                        var result;
                        if (resetFirst) {
                            makeVisible();
                        }

                        result = authorization.authorize(true, roles, attrs.accessPermissionType);
                        if (result === 'authorised') {
                            makeVisible();
                        } else {
                            makeHidden();
                        }
                    },
                    roles = attrs.access.split(',');


                if (roles.length > 0) {
                    determineVisibility(true);
                }
            }
        };
    };


    authDirective.$inject = injectParams;

    app.directive('access', authDirective);

});
