/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

define(['angular'], function(angular) {
    var ctrl = angular.module('cowGame.ctrl', [])

        .config(['$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            /**
             * override angular default module api for creating components
             * @type {Function|register|register|register}
             */
            ctrl.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };

        }]);

    return ctrl;
});