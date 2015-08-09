define(['angular', 'app.ctrl', 'jquery', 'cowGame'], function (angular, ctrls, $) {

    var injectParams = ['$scope', 'cowService','cowDialogService','cowNavService'];

    var cowController =  function ($scope, cowService,cowDialogService,cowNavService) {
        var vm = this;
        vm.test = "Hello there";
        vm.selectedCube = {};
        vm.person = {};
        vm.cowGame = {};

        init();

        vm.submit = function(valid){
            if(valid){
                cowService.addUser(vm.selectedCube);
                vm.cowGame.selectCube(vm.selectedCube.name);
                vm.reset(vm.userForm);
                vm.cowGame.openDialog = false;
                cowDialogService.close('modal',vm.dialogClosed)
            }
        };

        vm.reset = function(form) {
            form.$setPristine();
            form.$setUntouched();
            vm.person = null;
            cowDialogService.reset();
        };

        vm.init = function () {

            vm.cowGame = new CowGame(cowService,20);
            vm.cowGame.init();

            animate();

            // when the mouse moves, call the given function
            document.addEventListener('mousemove', mouseMove, false);
            document.addEventListener('mouseup', mouseClick, false);

           cowNavService.init();

        };

        vm.openHelp = function(){

        };

        vm.dialogClosed = function(){
            if(vm.cowGame.openDialog){
                vm.cowGame.openDialog = false;
            }

        };

        $scope.$on('$destroy', function () {
            window.cancelAnimationFrame(vm.cowGame.requestId);
            vm.cowGame.requestId = undefined;
            document.removeEventListener('mousemove', mouseMove, false);
            document.removeEventListener('mouseup', mouseClick, false);
            cowNavService.reset();
        });

        function animate(){
            vm.cowGame.requestId = requestAnimationFrame(animate);
            vm.cowGame.render();
            vm.cowGame.update();
        }

        function mouseMove(event) {
            // update the mouse variable
            cowNavService.displayNav(event,vm.cowGame.mouse2D);

        }

        function mouseClick(event) {
           // event.preventDefault();

            if (!cowDialogService.isOpen('modal') && !cowNavService.isOpen() && vm.cowGame.tempCube.targetName != null){
                vm.selectedCube = vm.cowGame.brushAction();
                vm.cowGame.openDialog = true;
                cowDialogService.open('modal',vm.dialogClosed);
            }
        }
        function init(){
            $('.modal').leanModal({
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    opacity: .5, // Opacity of modal background
                    in_duration: 300, // Transition in duration
                    out_duration: 200 // Transition out duration
                }
            );
        }
    };

    cowController.$inject = injectParams;

    ctrls.controller("CowController",cowController);

});