define(['angular','angularRoute','routeResolver', 'app.module', 'angularMocks'], function() {
    describe('Cowgame base test suite',function(){
        it('should have the module cowGame',function(){
            expect(module('cowGame')).not.toBeNull();
        });

    })
});

