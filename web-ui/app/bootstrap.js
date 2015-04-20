/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

require.config({
    paths: {
        angular: '../node_modules/angular/angular',
        angularRoute: '../node_modules/angular-route/angular-route'
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular']
    },
    priority: [
        'angular'
    ]
});

require([
        'angular',
        'app.route', 'app.module', 'app.ctrl',
        'index/indexCtrl'],
    function (angular) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['cowGame']);
        });
    }
);