define(function(require, exports, module) {
    // Imports
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Utility = require('famous/utilities/Utility');
    var ScrollView = require('famous/views/ScrollView');
    var Modifier           = require('famous/core/Modifier');
    var ViewSequence = require('famous/core/ViewSequence');
    var Draggable = require('famous/modifiers/Draggable');
    var RenderNode = require('famous/core/RenderNode');
    var EventHandler = require('famous/core/EventHandler');

    function ListView() {
        View.apply(this, arguments);
        this.dragStart = 0;
        this.dragEnd = 0;
        this.items = [];

        this.scrollView = new ScrollView({
            direction: Utility.Direction.Y,
            margin: 100000
        });

        this.viewSequence = new ViewSequence(this.items);
        this.scrollView.sequenceFrom(this.viewSequence);

        this.add(this.scrollView);
    }

    ListView.prototype = Object.create(View.prototype);
    ListView.prototype.constructor = ListView;

    ListView.prototype.setItemView = function (view) {
        this.ListItemView = view;
    };

    ListView.prototype.setContent = function(collection) {
        collection.each(function(object) {
            var item = new this.ListItemView();

            var draggable = new Draggable({
                xRange: [-150, 150],
                yRange: [0, 0]
            });

            draggable.on('start', function(e) {
                this.dragStart = e.position[0];
            }.bind(this));

            draggable.on('end', function(draggable, item, e) {
                this.dragEnd = e.position[0];
                var distance = this.dragStart - this.dragEnd;

                if(distance > 0 && distance >= 130){
                    e.position[0] = -130;
                    // item.addClass('show-options');
                } else if(distance < 0 && distance <= -120) {
                    this._eventOutput.emit('swipe', draggable);
                    e.position[0] = 0;
                } else {
                    // item.removeClass('show-options');
                    e.position[0] = 0;
                }

            }.bind(this, draggable, item));

            var node = new RenderNode(draggable);
            node.add(new Modifier({origin: [0.5, 0]})).add(item);

            item.pipeTo(this.scrollView);
            item.pipeTo(draggable);
            item.setContent(object.attributes);

            this.items.push(node);
        }, this);
    };

    ListView.prototype.removeElement = function(item) {
        var index = -1;
        for (var i = 0; i < this.items.length; i++) {
            if(this.items[i].get() == item) {
                index = i;
                break;
            }
        }
        if(index != -1) {
            this.items.splice(index, 1);
        }
    };

    module.exports = ListView;
});