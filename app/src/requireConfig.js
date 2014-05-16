/*globals require*/
require.config({
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
    },
    paths: {
        famous: '../lib/famous',
        backbone: '../lib/backbone/backbone',
        underscore: '../lib/underscore/underscore',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-polyfills': '../lib/famous-polyfills/index',
        jquery: '../lib/jquery/dist/jquery'
    }
});
require(['main']);
