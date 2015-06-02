define(['angular'], function (angular) {
    var directive = angular.module('cowGame.directive', []).config(['$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider,
                                                                     $compileProvider, $filterProvider, $provide) {
            /**
             * override angular default module api for creating components
             * @type {Function|register|register|register}
             */
            directive.controller = $controllerProvider.register;
            directive.directive = $compileProvider.directive;
            directive.filter = $filterProvider.register;
            directive.factory = $provide.factory;
            directive.service = $provide.service;

        }]);

    return directive;
});