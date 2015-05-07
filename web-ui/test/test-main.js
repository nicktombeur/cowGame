var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/app',

  paths: {
        'angular':'../lib/angular/angular.min',
        'angularMocks':'../test/lib/angular-mocks/angular-mocks',
        'angularRoute': '../lib/angular-route/angular-route.min'
  },
  shim:{
    'angular': {
      'exports': 'angular'
    },
    'angularRoute': {
      deps: ['angular']
    },
    'angularMocks':{
      deps:['angular']
      
    }
    ,
    priority: [
      'angular'
    ]
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
