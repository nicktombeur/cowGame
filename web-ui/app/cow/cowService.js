define(['app.service'], function(services) {
    services.factory('cowService', function() {

        var field = [];


       return{
           getSelectedCubes: function(cube){
               var BreakException= {};

               try {
                   field.forEach(function(el) {
                       if(el.name === cube.name) throw BreakException;
                   });
               } catch(e) {
                   if (e!==BreakException) throw e;
                   return true;
               }

               return false;
           },
           addUser: function(cubeName){
               field.push(cubeName);
           }
       }

    });
});
