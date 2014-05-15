define(function(require, exports, module) {
    // Imports
    var Surface   = require('famous/core/Surface');
    var Modifier  = require('famous/core/Modifier');
    var View  = require('famous/core/View');
    var Transform = require('famous/core/Transform');

    function HeaderView() {
        View.apply(this, arguments);

        this.header = new View();

        this.sizeModifier = new Modifier({
            size: [undefined, 0.105 * window.innerHeight],
            transform: Transform.inFront
        });

        this.background = new Surface({
            classes: ['top-nav-bar']
        });

        this.iconModifier = new Modifier({
           transform: Transform.translate(0, 0, 0)
        });

        this.menuIcon = new Surface({
            size: [67, 67],
            content: "<span class='icon open-menu'>&#xf0c9</span>",
            classes: ['top-nav-bar-button'],
            properties: {
                fontSize: '30px'
            }
        });

        this.menuIcon.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        this.title = new Surface({
            content: 'famous app',
            size: [undefined, 68],
            classes: ['top-nav-bar-title']
        });
        this.titleModifier = new Modifier({
            origin: [0.5, 0.5],
            opacity: 0.9
        })

        this.header._add(this.background);
        this.header._add(this.iconModifier).add(this.menuIcon);
        this.header._add(this.titleModifier).add(this.title);

        this._add(this.sizeModifier).add(this.header);

    };

    HeaderView.prototype = Object.create(View.prototype);
    HeaderView.prototype.constructor = HeaderView;

    module.exports = HeaderView;
});