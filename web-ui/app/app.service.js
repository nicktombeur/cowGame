define(['angular'], function (angular) {
    var service = angular.module('cowGame.service', []).config(['$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider,
                                                                     $compileProvider, $filterProvider, $provide) {
            /**
             * override angular default module api for creating components
             * @type {Function|register|register|register}
             */
            service.controller = $controllerProvider.register;
            service.directive = $compileProvider.directive;
            service.filter = $filterProvider.register;
            service.factory = $provide.factory;
            service.service = $provide.service;

        }]);

    return service;
});