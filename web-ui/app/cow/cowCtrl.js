define(['angular', 'app.ctrl', 'jquery', 'cowGame'], function (angular, ctrls, $) {

    ctrls.controller('CowController', ['$scope', 'cowService', function ($scope, cowService) {
        var heightNav;
        var vm = this;
        vm.test = "Hello there";
        vm.selectedCube = {};
        vm.person = {};
        vm.cowGame = {};

        vm.submit = function(valid){
            if(valid){
                cowService.addUser(vm.selectedCube);
                vm.cowGame.selectCube(vm.selectedCube.name);
                vm.reset(vm.userForm);
                $('#modal3').closeModal();
            }
        };

        vm.reset = function(form) {
            form.$setPristine();
            form.$setUntouched();
            vm.person = null;
        };

        vm.init = function () {
            $('.modal-trigger').leanModal();
            vm.cowGame = new CowGame(cowService,20);
            vm.cowGame.init();

            animate();

            // when the mouse moves, call the given function
            document.addEventListener('mousemove', mouseMove, false);
            document.addEventListener('mouseup', mouseClick, false);

            heightNav =  $("nav").height()/2;
            $("nav").hide();
            $("footer").hide();

        };

        vm.openHelp = function(){
            $('#modal-help').openModal()
        };

        $scope.$on('$destroy', function () {
            window.cancelAnimationFrame(vm.cowGame.requestId);
            vm.cowGame.requestId = undefined;
            document.removeEventListener('mousemove', mouseMove, false);
            document.removeEventListener('mouseup', mouseClick, false);
        });

        function animate(){
            vm.cowGame.requestId = requestAnimationFrame(animate);
            vm.cowGame.render();
            vm.cowGame.update();
        }

        function mouseMove(event) {
            // update the mouse variable
            if(event.clientY < heightNav){
                $("nav").slideDown();
            }
           else{
                $("nav").slideUp();
                vm.cowGame.mouse2D.x = ( event.clientX / window.innerWidth  ) * 2 - 1;
                vm.cowGame.mouse2D.y = -( event.clientY / (window.innerHeight) ) * 2 + 1;
            }

        }

        function mouseClick(event) {
            event.preventDefault();
            if (!$('#modal3').is(":visible") && !$('nav').is(":visible") && vm.cowGame.brush.targetName != null){
                vm.selectedCube = vm.cowGame.brushAction();
                $('#modal3').openModal();
            }

        }
    }
    ])
    ;
});