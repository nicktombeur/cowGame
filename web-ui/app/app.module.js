/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

define([
    'angular',
    'angularRoute'
], function(angular) {
    return angular.module('cowGame', ['ngRoute','routeResolver','ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.moveColumns','cowGame.ctrl','cowGame.service','cowGame.directive']);
});