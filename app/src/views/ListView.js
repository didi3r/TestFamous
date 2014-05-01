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
                size: [undefined, 60],
                content: 'Item ' + data[i],
                classes: ['listview-item']
            });

            var draggable = new Draggable({
                xRange: [-100, 100],
                yRange: [0, 0]
            });
            
            var node = new RenderNode(draggable);
            node.add(item);  

            draggable.on('start', function() {
                console.log('emit swipe')
                this._eventOutput.emit('swipe');
            }.bind(this));

            item.pipe(draggable);
            item.pipe(this.scrollView);
            this.items.push(node);
        }
    };


    module.exports = ListView;
});