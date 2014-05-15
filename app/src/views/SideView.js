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

        this.search = new Surface({
            size: [undefined, 100],
            content: '<input type="text" class="search-box" placeholder="Buscar" />',
            classes: ['sideview-search']
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
        this.menuView.add(this.search);

        this.nodeLayout = new RenderNode(new Modifier({
            size: [this.params.width, this.menuHeight],
            origin: [0, 0.2]
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
            },
            {
                name: 'Donate',
                icon: '&#xf004',
            },
            {
                name: 'About',
                icon: '&#xf059',
            }
        ];

        for(var i = 0; i < categories.length; i++) {
            var item = new Surface({
                size: [undefined, 60],
                classes: ["sideview-item"],
                content:
                    '<div class="view">' +
                        // '<span class="icon">' +
                        //     categories[i]['icon'] +
                        // '</span> ' +
                        categories[i]["name"] +
                    '</div>'
            });

            this.menuItems.push(item);
        }
    }

    // var calculateHeight = function() {
    //     var height = 0;
    //     for (var i = 0; i < this.menuItems.length; i++) {
    //         height += this.menuItems[i].getSize()[1];
    //     }

    //     console.log(height);
    //     return height;
    // }

    module.exports = SideView;
});