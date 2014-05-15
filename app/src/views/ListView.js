define(function(require, exports, module) {
    // Imports
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Utility = require('famous/utilities/Utility');
    var ScrollView = require('famous/views/ScrollView');
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

        this._add(this.scrollView);
    };

    ListView.prototype = Object.create(View.prototype);
    ListView.prototype.constructor = ListView;

    ListView.prototype.setContent = function(data) {
        for (var i = 0; i < data.length; i++) {
            var item = new Surface({
                size: [undefined, 70],
                content:
                    '<div class="view"> ' +
                        '<div class="delete">' +
                            '<i class="fa fa-times"></i>' +
                            '<span>Suelta Para Eliminar</span>' +
                        '</div>' +
                        '<div class="content">Item ' + data[i] + '</div>' +
                        '<ul class="options">' +
                            '<li><i class="fa fa-heart"></i></li>' +
                            '<li><i class="fa fa-comment"></i></li>' +
                        '</ul>' +
                    '</div>',
                classes: ['listview-item']
            });

            var draggable = new Draggable({
                xRange: [-150, 150],
                yRange: [0, 0]
            });

            draggable.on('start', function(e) {
                this.dragStart = e.position[0];
            }.bind(this));

            draggable.on('end', function(item, e) {
                this.dragEnd = e.position[0];
                if((this.dragStart - this.dragEnd) >= 130){
                    e.position[0] = -130;
                    item.addClass('show-options');
                } else {
                    item.removeClass('show-options');
                    e.position[0] = 0;
                }

                if((this.dragStart - this.dragEnd) >= -120){
                    e.position[0] = 0;
                } else {
                    this._eventOutput.emit('swipe', item);
                    e.position[0] = 0;
                }
            }.bind(this, item));

            var node = new RenderNode(draggable);
            node.add(item);
            item.pipe(draggable);
            item.pipe(this.scrollView);

            this.items.push(node);
        }
    };


    module.exports = ListView;
});