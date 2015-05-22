/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

require.config({
    baseurl:'app',
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        jquery: '../lib/jquery/dist/jquery.min',
        materialize: '../lib/materialize/bin/materialize',
        hammerjs: '../lib/materialize/js/hammer.min',
        'cowGame': '../assets/threejs/cowGame',
        threejs_base: '../assets/threejs/Three',
        threejs_detector: '../assets/threejs/Detector',
        threejs_stats: '../assets/threejs/Stats',
        threejs_keyboard: '../assets/threejs/KeyboardState',
        threejs_fullscreen: '../assets/threejs/THREEx.FullScreen',
        threejs_windowResize: '../assets/threejs/THREEx.WindowResize',
        threejs_OBJLoader: '../assets/threejs/OBJLoader',
        threejs_MTLLoader: '../assets/threejs/MTLLoader',
        threejs_OBJMTLLoader: '../assets/threejs/OBJMTLLoader'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': {
            deps:['angular']
        },
        'materialize': {
            'export': 'materialize',
            deps:['jquery', 'hammerjs']
        },
        'threejs_OBJLoader': {
            deps: ['threejs_base']
        },
        'threejs_MTLLoader': {
            deps: ['threejs_base']
        },
        'threejs_OBJMTLLoader': {
            deps: ['threejs_base']
        },
        'cowGame': {
            deps: ['threejs_base', 'threejs_detector', 'threejs_stats', 'threejs_keyboard', 'threejs_fullscreen', 'threejs_windowResize', 'threejs_OBJLoader', 'threejs_MTLLoader', 'threejs_OBJMTLLoader','cow/CowGame']
        }
    }
});

require([
        'angular', 'jquery','materialize','routeResolver','app.ctrl','app.service',
        'app.route'],
    function (angular, $) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['cowGame']);

            $('.button-collapse').sideNav();
        });
    }
);