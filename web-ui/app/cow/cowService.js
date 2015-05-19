define(['../app.services'], function(services) {
    services.factory('cowService', function() {

        var field = [];


       return{

           init: function(fieldSize,CUBE_SIZE,scene,cubeNames){
               for(var x = 0; x < fieldSize; x++){
                   for(var z = 0; z< fieldSize; z++){

                       var genPosition = new THREE.Vector3( CUBE_SIZE* x, 0, CUBE_SIZE*z);
                       var scenePos = genPosition.clone().add( new THREE.Vector3(0.5, 0.5, 0.5) );

                       var cube = new THREE.Mesh( cubeGeo );
                       cube.material = materials["solid"][ brush.colorIndex ];
                       cube.position = scenePos.clone();
                       cube.name = "X" + genPosition.x + "Y" + genPosition.y + "Z" + genPosition.z;
                       cube.colorIndex = 1;
                       cube.coord = {x: x+1,y:z+1};
                       cube.selected = false;

                       scene.add( cube );
                       cubeNames.push( cube.name );

                   }
               }
           },

           getField: function(){
                return field;
           },
           addUser: function(cubeName){
               field.forEach(function(element, index, array){
                   if(element.name === cubeName){
                       element.selected = true;
                   }
               })
           }
       }

    });
});
