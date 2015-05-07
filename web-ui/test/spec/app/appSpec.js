define(['angular','angularRoute','app.ctrl' , 'app.module', 'angularMocks'], function() {
    describe('Cowgame base test suite',function(){
        it('should have the module cowGame',function(){
            expect(module('cowGame')).not.toBeNull();
        });
        it('should have the module cowGame.ctrls',function(){
            expect(module('cowGame.ctrls')).not.toBeNull();
            
        });
    })
});

