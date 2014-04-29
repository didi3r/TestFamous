define(function(require, exports, module) {
    var Surface    = require('famous/core/Surface');
    var Modifier   = require('famous/core/Modifier');
    var Transform  = require('famous/core/Transform');
    var View       = require('famous/core/View');
    var GridLayout = require('famous/views/GridLayout');

    function SideView(params) {
        View.apply(this, arguments);

        this.params = params || {
            width: 500,
            items: []
        };
        
        this.open = false;

        this.slide = new Modifier({
            transform: Transform.translate(-this.params.width, 0, 0)
        });

        this.background = new Surface({
            size: [undefined, undefined],
            classes: ['sideview']
        });

        this.layout = new GridLayout({
            dimensions: [1, this.params.items.length]
        });

        this.buttons = [];
        this.layout.sequenceFrom(this.buttons);

        createButtons.call(this);

        this._add(new Modifier({size : [this.params.width, undefined]}))
            .add(new Modifier({origin : [1,0]}))
            .add(this.slide)
            // .add(this.background)
            .add(this.layout);
    }

    SideView.prototype = Object.create(View.prototype);
    SideView.prototype.constructor = SideView;


    SideView.prototype.flipOut = function() {
        this.slide.setTransform(Transform.translate(-this.params.width, 0, 0), { duration: 500, curve: 'easeOut' });
    }

    SideView.prototype.flipIn = function() {
        this.slide.setTransform(Transform.translate(-this.params.width, 0, 0), { duration: 500, curve: 'easeOut' });
    };


    var createButtons = function() {
        var categories = [
            {
                name: 'Home',
                icon: '&#xf0c2'
            }
        ];

        for(var i = 0; i < categories.length; i++) {
            var button = new View();

            var backingSurface = new Surface({
                size: [undefined, undefined],
                classes: ["icon", "sideview-button-box", categories[i]["name"]]
            });

            var iconSurface = new Surface({
                size: [undefined, undefined],
                content: categories[i]['icon'],
                classes: ["icon", "sideview-button", categories[i]["name"]],
                properties: {
                    lineHeight: '60px'
                }
            });

            var iconMod = new Modifier({
                transform: Transform.inFront,
                size: [400, 60],
                origin: [.5, .5]
            });


            var backMod = new Modifier({
                transform: Transform.behind
            });

            button.add(backMod).add(backingSurface);
            button.add(iconMod).add(iconSurface);
            this.buttons.push(button);
        }
    };

    module.exports = SideView;
});