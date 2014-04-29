/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Scrollview = require('famous/views/Scrollview');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var EdgeSwapper = require('famous/views/EdgeSwapper');
    var NavigationBar = require('famous/widgets/NavigationBar');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    // var logo = new ImageSurface({
    //     size: [200, 200],
    //     content: '/content/images/famous_logo.png'
    // });

    // var logoModifier = new StateModifier({
    //     origin: [0.5, 0.5]
    // });
    
    function App() {
        // create the layout
        var layout = new HeaderFooterLayout();

        var header = new Surface({
            size: [undefined, 60],
            content: 'Hello World',
            classes: ['top-nav-bar'],
            options: {
                lineHeight: 60
            }
        });

        // create the navigation bar
        var navigation = new NavigationBar({
            buttons: {
                onClasses: ['top-nav-bar', 'on'],
                offClasses: ['top-nav-bar', 'off'],
                inTransition: {curve: 'easeInOut', duration: 150},
                outTransition: {curve: 'easeInOut', duration: 150}
            }
        });

        // create the content area
        var contentArea = new EdgeSwapper({
            inTransition: {curve: 'easeOutBounce', duration: 500},
            outTransition: {duration: 300},
            overlap: true 
        });

        // link endpoints of layout to widgets
        layout.header.add(NavigationBar);
        layout.content.add(contentArea);

        return layout;
    };
    var myApp = new App();


    mainContext.add(myApp)
});

