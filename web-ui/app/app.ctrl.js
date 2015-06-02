/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

define(['angular'], function (angular) {
    var ctrl = angular.module('cowGame.ctrl', [])

        .config(['$controllerProvider',
            '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                /**
                 * override angular default module api for creating components
                 * @type {Function|register|register|register}
                 */
                ctrl.controller = $controllerProvider.register;
                ctrl.directive = $compileProvider.directive;
                ctrl.filter = $filterProvider.register;
                ctrl.factory = $provide.factory;
                ctrl.service = $provide.service;

            }]);

    return ctrl;
});