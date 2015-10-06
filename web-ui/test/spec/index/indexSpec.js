define(['angular','angularResource','ui-grid', 'angularRoute', 'routeResolver', 'app.route','common/authService', 'common/navbarController', 'index/indexCtrl', 'angularMocks'], function () {
    describe('Cowgame index test suite', function () {
        beforeEach(module('cowGame'));

        var $rootScope, $controller;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
        }));


        it('should provide the indexCtrl', function () {

            var ctrl = $controller('IndexController', {$scope: $rootScope.$new()});

            expect(ctrl).not.toBeNull();
        });
        it('indexCtrl should have dummy data test', inject(function () {

            var ctrl = $controller('IndexController', {$scope: $rootScope.$new()});

            expect(ctrl.test).toBe('Some motivational text here ...');

        }))
    })
});

