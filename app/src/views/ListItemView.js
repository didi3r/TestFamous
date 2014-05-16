define(function(require, exports, module) {
    // Imports
    var View    = require('famous/core/View');
    var Surface = require('famous/core/Surface');

    function ListItemView(params) {
        View.apply(this, arguments);
        this.view = new View();

        this.params = params || {
            height: 50
        }

        this._add(this.view);
    };

    ListItemView.prototype = Object.create(View.prototype);
    ListItemView.prototype.constructor = ListItemView;

    ListItemView.prototype.setContent = function(data) {
        this.item = new Surface({
            size: [undefined, 70],
            content:
                '<div class="view"> ' +
                    '<div class="delete">' +
                        '<i class="fa fa-times"></i>' +
                        '<span>Suelta Para Eliminar</span>' +
                    '</div>' +
                    '<div class="content">Item ' + data.content + '</div>' +
                    '<ul class="options">' +
                        '<li><i class="fa fa-heart"></i></li>' +
                        '<li><i class="fa fa-comment"></i></li>' +
                    '</ul>' +
                '</div>',
            classes: ['listview-item']
        });
        this.view._add(this.item);
        this.item.pipe(this.view);

        this.view._eventInput.on('click', function() {
            console.log('_eventInput');
        });
    }

    module.exports = ListItemView;
});