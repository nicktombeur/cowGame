/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

require.config({
    paths: {
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        jquery: '../lib/jquery/dist/jquery.min',
        materialize: '../lib/materialize/dist/js/materialize.min',
        hammerjs: '../lib/materialize/js/hammer.min'
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular'],
        'materialize': ['jquery', 'hammerjs'],
        'app.module': ['angular', 'angularRoute'],
        'app.route': ['app.module'],
        'app.ctrl': ['app.module']
    },
    priority: [
        'angular'
    ]
});

require([
        'angular', 'jquery', 'materialize', 'hammerjs',
        'app.route', 'app.module', 'app.ctrl',
        'index/indexCtrl'],
    function (angular, $) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['cowGame']);

            $('.button-collapse').sideNav();
        });
    }
);