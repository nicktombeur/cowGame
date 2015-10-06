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
        angularResource: '../lib/angular-resource/angular-resource.min',
        'angularMocks': '../lib/angular-mocks/angular-mocks',
        'angularRoute': '../lib/angular-route/angular-route.min',
        jquery: '../lib/jquery/dist/jquery.min',
        cowGame: '../assets/threejs/cowGame',
        "ui-grid": '../lib/angular-ui-grid/ui-grid.min',
        "pdfMakeLib": '../lib/pdfmake/build/pdfmake.min',
        "pdfMake": '../lib/pdfmake/build/vfs_fonts'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'angular': {
            'exports': 'angular'
        },
        "angularResource": {
            deps: ["angularRoute"]
        },
        'angularRoute': {
            deps: ['angular', 'ui-grid']
        },
        'ui-grid': {
            deps: ['angular']
        },
        'angularMocks': {
            deps: ['angular']

        },
        pdfMakeLib: {
            exports: 'pdfMake'
        },
        pdfMake: {
            deps: ['pdfMakeLib'],
            exports: 'pdfMake'
        }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
