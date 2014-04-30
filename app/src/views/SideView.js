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

        this.title = new Surface({
            size: [undefined, 70],
            origin: [0.1, 0],
            content: 'Menu',
            classes: ['sideview-title']
        });

        this.menuLayout = new GridLayout({
            dimensions: [1, 3]
        });

        this.menuItems = [];
        this.menuLayout.sequenceFrom(this.menuItems);

        createButtons.call(this);
        // this.menuHeight = calculateHeight.call(this);
        this.menuHeight = 180;
        
        this.menuView = new View();
        this.menuView.add(this.background);
        this.menuView.add(this.title);

        this.nodeLayout = new RenderNode(new Modifier({
            size: [this.params.width - 30, this.menuHeight],
            origin: [0, 0.14]
        }));
        this.nodeLayout.add(this.menuLayout);

        this.menuView.add(this.nodeLayout);

        this._add(this.sideViewModifier).add(this.menuView);
    }

    SideView.prototype = Object.create(View.prototype);
    SideView.prototype.constructor = SideView;

    var createButtons = function() {
        var categories = [
            {
                name: 'Home',
                icon: '&#xf0c2',
                color: '#00B4A9'
            },
            {
                name: 'Donate',
                icon: '&#xf004',
                color: '#77BF6E'
            },
            {
                name: 'About',
                icon: '&#xf059',
                color: '#DADD89'
            }
        ];

        for(var i = 0; i < categories.length; i++) {
            var itemView = new View();

            var itemBox = new Surface({
                size: [undefined, 40],
                classes: ["sideview-menu-item"],
                properties: {
                    background: categories[i]['color']
                }
            });

            var itemText = new Surface({
                size: [true, true],
                classes: ["sideview-menu-item-text"],
                content: '<span class="icon">' + categories[i]['icon'] + '</span> ' + categories[i]["name"],
                properties: {
                    lineHeight: '40px'
                }
            });
            
            var nodeText = new RenderNode(new Modifier({
                origin: [0.05, 0],
                transform: Transform.inFront
            }));
            nodeText.add(itemText);

            itemView.add(itemBox);
            itemView.add(nodeText);

            this.menuItems.push(itemView);
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