/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

define([
    'angular',
    'angularRoute'
], function(angular) {
    return angular.module('cowGame', ['ngRoute','routeResolver','cowGame.ctrl','cowGame.service']);
});