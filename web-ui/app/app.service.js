define(['angular'], function(angular) {
    var service = angular.module('cowGame.service', []).config(['$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide',function($controllerProvider,
                                                                    $compileProvider, $filterProvider, $provide){
        /**
         * override angular default module api for creating components
         * @type {Function|register|register|register}
         */
        service.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

    }]);

    return service;
});