define(['angular','angularRoute','app.ctrl','app.service', 'app.module', 'angularMocks'], function() {
    describe('Cowgame base test suite',function(){
        it('should have the module cowGame',function(){
            expect(module('cowGame')).not.toBeNull();
        });
        it('should have the module cowGame.ctrl',function(){
            expect(module('cowGame.ctrl')).not.toBeNull();

        });
        it('should have the module cowGame.service',function(){
            expect(module('cowGame.service')).not.toBeNull();

        });
    })
});

