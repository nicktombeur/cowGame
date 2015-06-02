'use strict';

define(['app.module'], function (app) {

    var injectParams = ['$scope', '$location', 'authService'];

    var NavbarController = function ($scope, $location, authService) {
        var vm = this;

        vm.loginOrOut = function () {
            setLoginLogoutText();
            var isAuthenticated = authService.user.isAuthenticated;
            if (isAuthenticated) { //logout

                 authService.logout();

                 $location.path('/');

            }
            redirectToLogin();
        };

        function redirectToLogin() {
            var path = '/login' + $location.$$path.replace('/login','');
            $location.replace();
            $location.path(path);
        }

        $scope.$on('loginStatusChanged', function (loggedIn) {
            setLoginLogoutText(loggedIn);
        });

        $scope.$on('redirectToLogin', function () {
            redirectToLogin();
        });

        function setLoginLogoutText() {
            vm.login = (authService.user.isAuthenticated) ? true : false;
        }

        setLoginLogoutText();

    };

    NavbarController.$inject = injectParams;


    //Loaded normally since the script is loaded upfront 
    //Dynamically loaded controller use app.register.controller
    app.controller('NavbarController', NavbarController);

});