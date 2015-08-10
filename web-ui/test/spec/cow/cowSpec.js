define(['angular','jquery','angularRoute','routeResolver', 'app.route','app.ctrl','app.service','app.directive','cow/cowServices', 'cow/cowCtrl','angularMocks'], function() {
    describe('Cowgame board test suite',function(){
        beforeEach(module('cowGame'));

        var $rootScope,$controller;

        beforeEach(inject(function(_$controller_,_$rootScope_){
            $controller = _$controller_;
            $rootScope = _$rootScope_;
        }));


        it('should provide the cowCtrl', function(){

            var ctrl = $controller('CowController', { $scope: $rootScope.$new() });

            expect(ctrl).not.toBeNull();
        });

        it('should have a dummy test', function(){

            var ctrl = $controller('CowController', { $scope: $rootScope.$new() });

            expect(ctrl.test).toBe('Hello there');
        });

    })
});
