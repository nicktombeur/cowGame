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
        materialize: '../lib/materialize/dist/js/materialize.min',
        hammerjs: '../lib/materialize/js/hammer.min'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'hammerjs':{
            'exports': 'hammerjs'
        },
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': {
            deps:['angular']
        },
        'materialize': {
            deps:['jquery', 'hammerjs']
        }
    }
});

require([
        'angular', 'jquery', 'materialize',
        'app.route'],
    function (angular, $) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['cowGame']);

            $('.button-collapse').sideNav();
        });
    }
);