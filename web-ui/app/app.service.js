define(['angular'], function(angular) {
    var service = angular.module('cowGame.service', []).config(['$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide',function($controllerProvider,
                                                                    $compileProvider, $filterProvider, $provide){
        /**
         * override angular default module api for creating components
         * @type {Function|register|register|register}
         */
        service.controller = $controllerProvider.register;
        service.service = $provide.service;
        service.factory = $provide.factory;
        service.filter = $filterProvider.register;
        service.directive = $compileProvider.directive;

    }]);

    return service;
});