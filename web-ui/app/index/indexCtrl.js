/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

define(['app.ctrl', 'jquery'], function (ctrls, $) {

    var indexController = function () {
        this.init = function () {
            $('.button-collapse').sideNav();
            $('.parallax').parallax();
        };

        this.test = "Some motivational text here ...";
    };

    ctrls.controller('IndexController', indexController);

});