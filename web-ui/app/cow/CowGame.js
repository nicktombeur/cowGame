CowGame = function (cowService,gridSize) {
// MAIN

// standard global variables
    this.cowService = cowService;
    this.container;
    this.scene;
    this.camera;
    this.renderer;
    this.controls;
    this.stats;
    this.mouse2D;
    this.cow;
    this.cubeNames = [];
    this.requestId = undefined;
    this.keyboard = new KeyboardState();
    this.clock = new THREE.Clock();
    this.GRID_SIZE = gridSize;
    this.CUBE_SIZE = 2;

// custom global variables
    this.mesh;
    this.person;
}

CowGame.prototype.constructor = CowGame;


CowGame.prototype.viewSet = function (n) {
    if (n == 1) // on ground near origin
    {
        this.person.position.set(-3, 3, 6);
        this.person.rotation.set(0, -Math.PI / 2.0, 0);
        this.camera.rotation.set(1.48, 0, 0);
    }
    if (n == 2) // birds-eye view
    {
        this.person.position.set(this.GRID_SIZE, 2 * this.GRID_SIZE, this.GRID_SIZE);
        this.person.rotation.set(0, -Math.PI / 2.0, 0);
        this.camera.rotation.set(-1.48, 0, 0);
    }
};

// FUNCTIONS
CowGame.prototype.init = function () {
    // SCENE
    this.scene = new THREE.Scene();
    // CAMERA
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = this.SCREEN_WIDTH / this.SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    // First Person Camera Controls
    this.person = new THREE.Object3D();
    this.person.add(this.camera);

    this.camera.position.set(0, 0, 0); // first-person view
    this.viewSet(2);
    this.scene.add(this.person);

    // RENDERER
    if (Detector.webgl)
        this.renderer = new THREE.WebGLRenderer({antialias: true});
    else
        this.renderer = new THREE.CanvasRenderer();

    this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    container = document.getElementById('ThreeJS');
    container.appendChild(this.renderer.domElement);
    // EVENTS
    THREEx.WindowResize(this.renderer, this.camera);

    // STATS
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.bottom = '0px';
    this.stats.domElement.style.zIndex = 100;
    container.appendChild(this.stats.domElement);
    // LIGHT

    this.setLight();

    // SKYBOX
    var cgiLogo = new THREE.ImageUtils.loadTexture("assets/img/cgi-logo.png");
    var skyBoxGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({map: cgiLogo, color: 0xffffee, side: THREE.BackSide});
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    this.scene.add(skyBox);

    this.loadCow();

    ////////////
    // CUSTOM //
    ////////////

    /*	var axis = new THREE.AxisHelper(33);
     axis.position.y = 0.01;
     scene.add(axis);*/


    var squareT = new THREE.ImageUtils.loadTexture("assets/img/square-thick.png");
    squareT.wrapS = squareT.wrapT = THREE.RepeatWrapping;
    squareT.repeat.set(this.GRID_SIZE, this.GRID_SIZE);
    var planeGeo = new THREE.PlaneGeometry(this.GRID_SIZE, this.GRID_SIZE);
    var planeMat = new THREE.MeshBasicMaterial({map: squareT, color: 0x009900});
    var basePlane = new THREE.Mesh(planeGeo, planeMat);
    basePlane.rotation.x = -Math.PI / 2;
    basePlane.position.set(this.GRID_SIZE / 2, 0, this.GRID_SIZE / 2);
    basePlane.base = true;
    this.scene.add(basePlane);

    this.cubeGeo = new THREE.CubeGeometry(this.CUBE_SIZE, this.CUBE_SIZE, this.CUBE_SIZE);

    var squareTexture = new THREE.ImageUtils.loadTexture("assets/img/square-thick.png");
    var squareTexturePlus = new THREE.ImageUtils.loadTexture("assets/img/square-plus.png");

    this.offset = [
        new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1)];

    this.colors = [new THREE.Color(0x66FFFF), new THREE.Color(0xffffff)];

    this.materials = {"solid": [], "select": []};
    for (var i = 0; i < this.colors.length; i++) {
        this.materials["solid"][i] = new THREE.MeshBasicMaterial({map: squareTexture, color: this.colors[i]});
        this.materials["select"][i] = new THREE.MeshBasicMaterial({map: squareTexturePlus, color: this.colors[i]});
    }

    this.brush = new THREE.Mesh(this.cubeGeo.clone(), this.materials["solid"][1]);
    this.brush.ignore = true;    // ignored by raycaster
    this.brush.visible = false;
    this.brush.colorIndex = 1;

    this.scene.add(this.brush);

    this.cubeNames = [];

    this.generateGrid();

    this.projector = new THREE.Projector();
    this.mouse2D = new THREE.Vector3(0, 0, 0.5);


};



CowGame.prototype.brushAction = function() {


    var cube = this.scene.getObjectByName(this.brush.targetName);
    if (cube && !cube.selected) {
       return {name: cube.name, x: cube.coord.x, y: cube.coord.y};

    }
    return false;
};

CowGame.prototype.selectCube = function(cubeName){
    var cube = this.scene.getObjectByName(cubeName);
    cube.material = this.materials["solid"][0];
    cube.colorIndex = 0;
    cube.selected = true;
};

CowGame.prototype.setLight = function() {
    var directionalLight = new THREE.DirectionalLight();
    directionalLight.position.copy(new THREE.Vector3(this.GRID_SIZE / 2, 40, this.GRID_SIZE / 2));
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
    this.scene.add(directionalLight);
}

CowGame.prototype.loadCow = function() {
    var loader = new THREE.OBJMTLLoader();
    var that = this;
    loader.load("../assets/model/cow/cowTM08New00RTime02.obj", "../assets/model/cow/cowTM08New00RTime02.mtl", function (cowObject) {
        cowObject.scale.set(0.3, 0.3, 0.3);
        cowObject.translateY(3);
        cowObject.translateX(this.GRID_SIZE / 2 + (0.5 * this.CUBE_SIZE));
        cowObject.translateZ(this.GRID_SIZE / 2 + (0.5 / this.CUBE_SIZE));
        // small fix of the material for better import
        cowObject.children[1].children[1].geometry.computeVertexNormals();
        cowObject.children[1].children[1].geometry.computeFaceNormals();
        cowObject.children[1].children[1].geometry.computeTangents();
        cowObject.children[1].children[1].material.opacity = 1;
        cowObject.children[1].children[1].material.shading = THREE.SmoothShading;
        cowObject.children[1].children[1].castShadow = true;
        that.cow = cowObject.clone();
        that.scene.add(that.cow);
    });
}

CowGame.prototype.generateGrid = function() {


    for (var x = 0; x < this.GRID_SIZE; x++) {
        for (var z = 0; z < this.GRID_SIZE; z++) {

            var genPosition = new THREE.Vector3(this.CUBE_SIZE * x, 0, this.CUBE_SIZE * z);
            var scenePos = genPosition.clone().add(new THREE.Vector3(0.5, 0.5, 0.5));

            var cube = new THREE.Mesh(this.cubeGeo);
            cube.position = scenePos.clone();
            cube.name = "X" + genPosition.x + "Y" + genPosition.y + "Z" + genPosition.z;
            cube.colorIndex = 1;
            cube.coord = {x: x + 1, y: z + 1};
            if (this.cowService.getSelectedCubes(cube)) {
                cube.material = this.materials["solid"][0];
            } else {
                cube.material = this.materials["solid"][1];
            }


            this.scene.add(cube);
            this.cubeNames.push(cube.name);
        }
    }

}

CowGame.prototype.update = function() {

    var delta = this.clock.getDelta();
    var moveDistance = 20 * delta; 			// 5 units per second
    var rotateAngle = Math.PI / 4 * delta;	// pi/4 radians (45 degrees) per second


    this.keyboard.update();
    if (!$('#modal3').is(":visible")) {
        // move forwards/backwards
        if (this.keyboard.pressed("Z"))
            this.person.translateZ(-moveDistance);
        if (this.keyboard.pressed("S"))
            this.person.translateZ(moveDistance);
        // move left/right (strafe)
        if (this.keyboard.pressed("Q"))
            this.person.translateX(-moveDistance);
        if (this.keyboard.pressed("D"))
            this.person.translateX(moveDistance);
        // move up/down (fly)
        if (this.keyboard.pressed("R"))
            this.person.translateY(moveDistance);
        if (this.keyboard.pressed("F"))
            this.person.translateY(-moveDistance);
        // turn left/right
        if (this.keyboard.pressed("A"))
            this.person.rotateY(rotateAngle);
        if (this.keyboard.pressed("E"))
            this.person.rotateY(-rotateAngle);
        // look up/down
        if (this.keyboard.pressed("T"))
            this.camera.rotateX(rotateAngle);
        if (this.keyboard.pressed("G"))
            this.camera.rotateX(-rotateAngle);
        // limit this.camera to +/- 45 degrees (0.7071 radians) or +/- 60 degrees (1.04 radians) or 85 (1.48)
        this.camera.rotation.x = THREE.Math.clamp(this.camera.rotation.x, -1.48, 1.48);
        // pressing both buttons moves look angle to original position
        var factor = (Math.abs(this.person.rotation.x) < 0.0001) ? -1 : 1;
        if (this.keyboard.pressed("Q") && this.keyboard.pressed("E"))
            this.person.rotateY(-6 * (-Math.PI / 2.0 - this.person.rotation.y) * rotateAngle * factor);
        if (this.keyboard.pressed("T") && this.keyboard.pressed("G"))
            this.camera.rotateX(-6 * this.camera.rotation.x * rotateAngle);

        // set view to Origin
        if (this.keyboard.down("O"))
            this.viewSet(1);
        // set view to bird's-eye-view (Pigeon's-eye-view?)
        if (this.keyboard.down("P"))
            this.viewSet(2);


        // voxel painting controls

        // when digit is pressed, change brush color data

        this.brush.material = this.materials["select"][this.brush.colorIndex];


        ///////////////////////////////////////////////////////////////////////////

        var raycaster = this.projector.pickingRay(this.mouse2D.clone(), this.camera);
        var intersectionList = [];
        intersectionList = raycaster.intersectObjects(this.scene.children);
        var result = null;
        for (var i = 0; i < intersectionList.length; i++) {
            if ((result == null) && (intersectionList[i].object instanceof THREE.Mesh) && !(intersectionList[i].object.ignore))
                result = intersectionList[i];
        }

        this.brush.visible = false;

        var targetCube = this.scene.getObjectByName(this.brush.targetName);
        if (targetCube)
            targetCube.material = this.materials["solid"][targetCube.colorIndex];
        this.brush.targetName = null;

        if (result) {
            if (!result.object.base) {
                this.brush.visible = false;
                var intPosition = new THREE.Vector3(Math.floor(result.object.position.x),
                    Math.floor(result.object.position.y), Math.floor(result.object.position.z));
                this.brush.targetName = "X" + intPosition.x + "Y" + intPosition.y + "Z" + intPosition.z;
                var targetCube = this.scene.getObjectByName(this.brush.targetName);

                if (!targetCube.selected) targetCube.material = this.materials["select"][targetCube.colorIndex];

                if (this.cow) this.cow.position = this.randomMovement(this.cow);

            }

        }
    }

    this.stats.update();
}

CowGame.prototype.randomMovement = function(result) {

    var x = result.position.x;
    var z = result.position.z;

    var doMove = (Math.floor(Math.random() * 20) + 1) === 10;

    if (doMove) {
        var movement = Math.floor(Math.random() * 4) + 1;

        if (movement === 1) {
            //UP
            if (this.GRID_SIZE > x) {
                x = x + this.CUBE_SIZE;
            } else {
                x = x - this.CUBE_SIZE;
            }

        } else if (movement === 2) {
            //DOWN
            if (x > 0) {
                x = x -this.CUBE_SIZE;
            } else {
                x = x + this.CUBE_SIZE;
            }

        } else if (movement === 3 && z > 0) {
            //LEFT
            if (z > 0) {
                z = z - this.CUBE_SIZE;
            } else {
                z = z + this.CUBE_SIZE;
            }

        } else if (movement === 4 && this.GRID_SIZE > z) {
            //RIGHT
            if (this.GRID_SIZE > z) {
                z = z + this.CUBE_SIZE;
            } else {
                z = z - this.CUBE_SIZE;
            }
        }
    }


    return new THREE.Vector3(x, 3, z);


}

CowGame.prototype.render = function() {
    this.renderer.render(this.scene, this.camera);
}

