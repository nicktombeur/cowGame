define(['angular','app.ctrl','jquery','cowGame','threejsCow'], function(angular,ctrls,$) {
    ctrls.controller('CowController', ['$scope','cowService',function($scope,cowService) {
        this.test = "Hello there";

        angular.element(document).ready(function () {
            clock = new THREE.Clock();
            keyboard = new KeyboardState();
            cubeNames = [];
            GRID_SIZE = 50;
            CUBE_SIZE = 2;
            init();
            animate();
        });

        $scope.$on('$destroy',function(){
            stop();
        });


        // MAIN

        // standard global variables
        var container, scene, camera, renderer, controls, stats,cow,cubeNames;
        var requestId = undefined;
        var keyboard = new KeyboardState();
        var clock = new THREE.Clock();
        var GRID_SIZE;
        var CUBE_SIZE;

        // custom global variables
        var mesh;
        var person;

        function viewSet(n)
        {
            if (n == 1) // on ground near origin
            {
                person.position.set(-3, 3, 6);
                person.rotation.set(0, -Math.PI / 2.0, 0);
                camera.rotation.set(-Math.PI / 16.0, 0, 0);
            }
            if (n == 2) // birds-eye view
            {
                person.position.set(GRID_SIZE, 2*GRID_SIZE, GRID_SIZE);
                person.rotation.set(0, -Math.PI / 2.0, 0);
                camera.rotation.set(-1.48, 0, 0);
            }
        }

        // FUNCTIONS
        function init()
        {
            // SCENE
            scene = new THREE.Scene();
            // CAMERA
            var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight - $("nav").height()/2;
            var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
            camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

            // First Person Camera Controls
            person = new THREE.Object3D();
            person.add(camera);
            camera.position.set(0, 0, 0); // first-person view
            viewSet(2);
            scene.add(person);

            // RENDERER
            if ( Detector.webgl )
                renderer = new THREE.WebGLRenderer( {antialias:true} );
            else
                renderer = new THREE.CanvasRenderer();

            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            container = document.getElementById( 'ThreeJS' );
            container.appendChild( renderer.domElement );
            // EVENTS
            THREEx.WindowResize(renderer, camera);
            THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

            // STATS
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.bottom = '0px';
            stats.domElement.style.zIndex = 100;
            container.appendChild( stats.domElement );
            // LIGHT

            setLight();

            // SKYBOX
            var cgiLogo = new THREE.ImageUtils.loadTexture("assets/images/cgi-logo.png");
            var skyBoxGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
            var skyBoxMaterial = new THREE.MeshBasicMaterial( { map:cgiLogo ,color: 0xffffee, side: THREE.BackSide } );
            var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
            scene.add(skyBox);

            loadCow();

            ////////////
            // CUSTOM //
            ////////////

            /*	var axis = new THREE.AxisHelper(33);
             axis.position.y = 0.01;
             scene.add(axis);*/


            var squareT = new THREE.ImageUtils.loadTexture("assets/images/square-thick.png");
            squareT.wrapS = squareT.wrapT = THREE.RepeatWrapping;
            squareT.repeat.set(GRID_SIZE,GRID_SIZE);
            this.planeGeo = new THREE.PlaneGeometry(GRID_SIZE,GRID_SIZE);
            this.planeMat = new THREE.MeshBasicMaterial({map:squareT, color:0x009900});
            this.basePlane = new THREE.Mesh(planeGeo, planeMat);
            basePlane.rotation.x = -Math.PI / 2;
            basePlane.position.set(GRID_SIZE/2,0,GRID_SIZE/2);
            basePlane.base = true;
            scene.add(basePlane);

            this.cubeGeo = new THREE.CubeGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE);

            var squareTexture     = new THREE.ImageUtils.loadTexture("assets/images/square-thick.png");
            var squareTexturePlus = new THREE.ImageUtils.loadTexture("assets/images/square-plus.png");

            this.offset = [
                new THREE.Vector3(1,0,0), new THREE.Vector3(-1,0,0),
                new THREE.Vector3(0,1,0), new THREE.Vector3(0,-1,0),
                new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1) ];

            this.colors = [ new THREE.Color(0x66FFFF), new THREE.Color(0xffffff)];

            this.materials = { "solid":[], "select":[]};
            for (var i = 0; i < colors.length; i++)
            {
                materials["solid"][i]   = new THREE.MeshBasicMaterial( {map: squareTexture, color: colors[i]});
                materials["select"][i]     = new THREE.MeshBasicMaterial( {map: squareTexturePlus, color: colors[i]} );
            }

            this.brush = new THREE.Mesh( cubeGeo.clone(), materials["solid"][1] );
            brush.ignore = true;    // ignored by raycaster
            brush.visible = false;
            brush.mode = "select";
            brush.colorIndex = 1;

            scene.add( brush );

            cubeNames = [];

            generateGrid();

            this.projector = new THREE.Projector();
            this.mouse2D = new THREE.Vector3( 0, 0, 0.5 );

            // when the mouse moves, call the given function
            document.addEventListener( 'mousemove', mouseMove,  false );
            document.addEventListener( 'mousedown', mouseClick, false );

        }

        function mouseMove( event )
        {
            // update the mouse variable
            mouse2D.x =   ( event.clientX / window.innerWidth  ) * 2 - 1;
            mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        }

        function mouseClick( event )
        {
            brushAction();
            cowService.getField();
            event.preventDefault();
        }

        function brushAction()
        {

            if (brush.mode == "select")
            {

                var cube = scene.getObjectByName( brush.targetName );
                if (cube)
                {
                    cube.material = materials["solid"][0];
                    cube.colorIndex = 0;
                    cowService.addUser(cube.name);
                    alert("Name = " + cube.name + "\nPosition = X: " + cube.coord.x + " Y: " + cube.coord.y);
                }


            }
        }

        function animate()
        {
            requestId = requestAnimationFrame( animate );
            render();
            update();
        }

        function setLight() {
            var directionalLight = new THREE.DirectionalLight();
            directionalLight.position.copy(new THREE.Vector3(GRID_SIZE/2, 40, GRID_SIZE/2));
            directionalLight.castShadow = true;
            directionalLight.shadowCameraVisible = false;
            directionalLight.shadowCameraNear = 25;
            directionalLight.shadowCameraFar = 200;
            directionalLight.shadowCameraLeft = -50;
            directionalLight.shadowCameraRight = 50;
            directionalLight.shadowCameraTop = 50;
            directionalLight.shadowCameraBottom = -50;
            directionalLight.shadowMapWidth = 2048;
            directionalLight.shadowMapHeight = 2048;
            directionalLight.visible = true;
            directionalLight.name = 'dirLight';
            scene.add(directionalLight);
        }

        function loadCow() {
            var loader = new THREE.OBJMTLLoader();
            loader.load("../assets/model/cow/cowTM08New00RTime02.obj", "../assets/model/cow/cowTM08New00RTime02.mtl", function (cowObject) {
                cowObject.scale.set(0.3, 0.3, 0.3);
                cowObject.translateY(3);
                cowObject.translateX(GRID_SIZE/2 + (0.5 * CUBE_SIZE));
                cowObject.translateZ(GRID_SIZE/2 + (0.5 / CUBE_SIZE));
                // small fix of the material for better import
                cowObject.children[1].children[1].geometry.computeVertexNormals();
                cowObject.children[1].children[1].geometry.computeFaceNormals();
                cowObject.children[1].children[1].geometry.computeTangents();
                cowObject.children[1].children[1].material.opacity = 1;
                cowObject.children[1].children[1].material.shading = THREE.SmoothShading;
                cowObject.children[1].children[1].castShadow = true;
                cow = cowObject.clone();
                scene.add(cow);
            });
        }
        function generateGrid() {


            for(var x = 0; x < GRID_SIZE; x++){
                for(var z = 0; z< GRID_SIZE; z++){

                    var genPosition = new THREE.Vector3( CUBE_SIZE* x, 0, CUBE_SIZE*z);
                    var scenePos = genPosition.clone().add( new THREE.Vector3(0.5, 0.5, 0.5) );

                    var cube = new THREE.Mesh( cubeGeo );
                    cube.material = materials["solid"][ brush.colorIndex ];
                    cube.position = scenePos.clone();
                    cube.name = "X" + genPosition.x + "Y" + genPosition.y + "Z" + genPosition.z;
                    cube.colorIndex = 1;
                    cube.coord = {x: x+1,y:z+1};
                    scene.add( cube );
                    cubeNames.push( cube.name );
                }
            }

        }

        function update()
        {
            var delta = clock.getDelta();
            var moveDistance = 20 * delta; 			// 5 units per second
            var rotateAngle = Math.PI / 4 * delta;	// pi/4 radians (45 degrees) per second

            keyboard.update();

            // move forwards/backwards
            if (keyboard.pressed("Z"))
                person.translateZ( -moveDistance );
            if (keyboard.pressed("S"))
                person.translateZ(  moveDistance );
            // move left/right (strafe)
            if ( keyboard.pressed("Q") )
                person.translateX( -moveDistance );
            if ( keyboard.pressed("D") )
                person.translateX(  moveDistance );
            // move up/down (fly)
            if ( keyboard.pressed("R") )
                person.translateY(  moveDistance );
            if ( keyboard.pressed("F") )
                person.translateY( -moveDistance );
            // turn left/right
            if (keyboard.pressed("A"))
                person.rotateY(  rotateAngle );
            if (keyboard.pressed("E"))
                person.rotateY( -rotateAngle );
            // look up/down
            if ( keyboard.pressed("T") )
                camera.rotateX(  rotateAngle );
            if ( keyboard.pressed("G") )
                camera.rotateX( -rotateAngle );
            // limit camera to +/- 45 degrees (0.7071 radians) or +/- 60 degrees (1.04 radians) or 85 (1.48)
            camera.rotation.x = THREE.Math.clamp( camera.rotation.x, -1.48, 1.48 );
            // pressing both buttons moves look angle to original position
            var factor = (Math.abs(person.rotation.x) < 0.0001) ? -1 : 1;
            if ( keyboard.pressed("Q") && keyboard.pressed("E") )
                person.rotateY( -6 * (-Math.PI / 2.0 - person.rotation.y) * rotateAngle * factor );
            if ( keyboard.pressed("T") && keyboard.pressed("G") )
                camera.rotateX( -6 * camera.rotation.x * rotateAngle );

            // set view to Origin
            if (keyboard.down("O"))
                viewSet(1);
            // set view to bird's-eye-view (Pigeon's-eye-view?)
            if (keyboard.down("P"))
                viewSet(2);


            // voxel painting controls

            // when digit is pressed, change brush color data

            brush.material = materials["select"][ brush.colorIndex ];


            // perform brush action
            if ( keyboard.down("V") )
                brushAction();
            // delete last cube entered
            if ( keyboard.down("B") && cubeNames.length > 0 )
                scene.remove( scene.getObjectByName( cubeNames.pop() ) );

            ///////////////////////////////////////////////////////////////////////////

            var raycaster = projector.pickingRay( mouse2D.clone(), camera );
            var intersectionList = [];
            intersectionList = raycaster.intersectObjects( scene.children );
            var result = null;
            for ( var i = 0; i < intersectionList.length; i++ )
            {
                if ( (result == null) && (intersectionList[i].object instanceof THREE.Mesh) && !(intersectionList[i].object.ignore) )
                    result = intersectionList[i];
            }

            brush.visible = false;

            var targetCube = scene.getObjectByName( brush.targetName );
            if ( targetCube )
                targetCube.material = materials["solid"][ targetCube.colorIndex ];
            brush.targetName = null;

            if ( result )
            {
                if ( (brush.mode == "select") && !result.object.base )
                {
                    brush.visible = false;
                    var intPosition = new THREE.Vector3( Math.floor(result.object.position.x),
                        Math.floor(result.object.position.y), Math.floor(result.object.position.z) );
                    brush.targetName = "X" + intPosition.x + "Y" + intPosition.y + "Z" + intPosition.z;
                    var targetCube = scene.getObjectByName( brush.targetName );
                    targetCube.material = materials["select"][ targetCube.colorIndex ];

                    if(cow) cow.position = randomMovement(cow);

                }

            }

            stats.update();
        }

        function randomMovement(result){

            var x = result.position.x;
            var z = result.position.z;

            var doMove = (Math.floor(Math.random() * 20) + 1) === 10 ;

            if(doMove){
                var movement = Math.floor(Math.random() * 4) +1;

                if(movement === 1){
                    //UP
                    if(GRID_SIZE > x){
                        x = x + CUBE_SIZE;
                    }else{
                        x = x - CUBE_SIZE;
                    }

                }else if(movement === 2){
                    //DOWN
                    if(x > 0){
                        x = x - CUBE_SIZE;
                    }else{
                        x = x + CUBE_SIZE;
                    }

                }else if(movement === 3 && z > 0){
                    //LEFT
                    if(z > 0){
                        z = z - CUBE_SIZE;
                    }else{
                        z = z + CUBE_SIZE;
                    }

                }else if(movement === 4 && GRID_SIZE > z){
                    //RIGHT
                    if(GRID_SIZE > z){
                        z = z + CUBE_SIZE;
                    }else{
                        z = z- CUBE_SIZE;
                    }
                }
            }



            return new THREE.Vector3(x,3,z);


        }

        function render()
        {
            renderer.render( scene, camera );
        }
        function stop()
        {
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        }


    }]);
});