var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(file);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/app',

    paths: {
        'angular': '../lib/angular/angular.min',
        'angularMocks': '../lib/angular-mocks/angular-mocks',
        'angularRoute': '../lib/angular-route/angular-route.min',
        jquery: '../lib/jquery/dist/jquery.min',
        materialize: '../lib/materialize/dist/js/materialize.min',
        hammerjs: '../lib/materialize/js/hammer.min'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'hammerjs': {
            'exports': 'hammerjs'
        },
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': {
            deps: ['angular']
        },
        'materialize': {
            deps: ['jquery', 'hammerjs']
        },
        'angularMocks': {
            deps: ['angular']

        }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
