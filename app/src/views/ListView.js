define(function(require, exports, module) {
    // Imports
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Utility = require('famous/utilities/Utility');
    var ScrollView = require('famous/views/ScrollView');
    var ViewSequence = require('famous/core/ViewSequence');

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
                size: [undefined, 50],
                content: 'Item ' + data[i],
                classes: ['listview-item']
            })
            item.pipe(this.scrollView);
            this.items.push(item);
        }
    };


    module.exports = ListView;
});