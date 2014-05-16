/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous',
        backbone: '../lib/backbone/backbone',
        underscore: '../lib/underscore',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-polyfills': '../lib/famous-polyfills/index',
        jquery: '../lib/jquery/dist/jquery'
    }
});
require(['main']);
