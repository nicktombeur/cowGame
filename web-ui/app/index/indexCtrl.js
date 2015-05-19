/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

define(['app.module', 'jquery'], function (app, $) {
    app.controller('IndexController', [function () {
        this.init = function () {
            $('.button-collapse').sideNav();
            $('.parallax').parallax();
        };

        this.test = "Some motivational text here ...";
    }]);
});