define(function(require, exports, module) {
    var Surface    = require('famous/core/Surface');
    var Modifier   = require('famous/core/Modifier');
    var Transform  = require('famous/core/Transform');
    var View       = require('famous/core/View');
    var GridLayout = require('famous/views/GridLayout');
    var RenderNode = require('famous/core/RenderNode');

    function SideView(params) {
        View.apply(this, arguments);

        this.params = params || {
            width: 500
        };
        
        this.open = false;

        this.sideViewModifier = new Modifier({
            size: [this.params.width, undefined ],
            transform: Transform.translate(-this.params.width, 0, 0)
        });

        this.background = new Surface({
            size: [undefined, undefined],
            classes: ['sideview']
        });

        this.menuLayout = new GridLayout({
            dimensions: [1, 3]
        });

        this.menuItems = [];
        this.menuLayout.sequenceFrom(this.menuItems);

        createButtons.call(this);
        this.menuHeight = calculateHeight.call(this);
        
        this.menuView = new View();
        this.menuView.add(this.background);

        this.nodeLayout = new RenderNode(new Modifier({
            size: [this.params.width - 30, this.menuHeight],
            origin: [0, 0]
        }));
        this.nodeLayout.add(this.menuLayout);

        this.menuView.add(this.nodeLayout);

        this._add(this.sideViewModifier).add(this.menuView);
    }

    SideView.prototype = Object.create(View.prototype);
    SideView.prototype.constructor = SideView;


    SideView.prototype.flipOut = function() {
        this.slide.setTransform(Transform.translate(-this.params.width, 0, 0), { duration: 500, curve: 'easeOut' });
    }

    SideView.prototype.flipIn = function() {
        this.slide.setTransform(Transform.translate(-this.params.width, 0, 0), { duration: 500, curve: 'easeOut' });
    }


    var createButtons = function() {
        var categories = [
            {
                name: 'Home',
                icon: '&#xf0c2'
            },
            {
                name: 'Donate',
                icon: '&#xf0c2'
            },
            {
                name: 'About',
                icon: '&#xf0c2'
            }
        ];

        for(var i = 0; i < categories.length; i++) {
            var button = new View();

            var box = new Surface({
                size: [undefined, 60],
                content: categories[i]['icon'] + ' ' + categories[i]["name"],
                classes: ["icon", "sideview-menu-item", categories[i]["name"]],
                properties: {
                    lineHeight: '60px'
                }
            });

            button.add(new Modifier({
                origin: [0, 0],
                transform: Transform.inFront
            })).add(box);

            this.menuItems.push(button);
        }
    }

    var calculateHeight = function() {
        var height = 0;
        for (var i = 0; i < this.menuItems.length; i++) {
            height += this.menuItems[i].getSize()[1];
        }

        console.log(height);
        return height;
    }

    module.exports = SideView;
});