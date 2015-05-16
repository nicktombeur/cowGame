/**
 * Created by nicktombeur on 20/04/15.
 */
'use strict';

define(['app.ctrl', 'jquery'], function (controllers, $) {
    controllers.controller('IndexController', function () {
        this.init = function () {
            $('.parallax').parallax();
        };

        this.test = "Some motivational text here ...";
    });
});