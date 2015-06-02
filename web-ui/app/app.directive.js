define(['angular'], function(angular) {
    var directive = angular.module('cowGame.directive', []).config(['$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide',function($controllerProvider,
                                                                    $compileProvider, $filterProvider, $provide){
        /**
         * override angular default module api for creating components
         * @type {Function|register|register|register}
         */
        directive.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

    }]);

    return directive;
});