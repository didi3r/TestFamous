define(function(require, exports, module) {
    // Imports
    var View    = require('famous/core/View');
    var Surface = require('famous/core/Surface');

    function ListItemView(params) {
        View.apply(this, arguments);
        this.view = new View();
        this.listeners = [];

        this.params = params || {
            height: 50
        }

        this._add(this.view);
    };

    ListItemView.prototype = Object.create(View.prototype);
    ListItemView.prototype.constructor = ListItemView;

    ListItemView.prototype.pipeTo = function(target) {
        this.listeners.push(target);
    }

    ListItemView.prototype.setContent = function(object) {
        this.item = new Surface({
            size: [APP_WIDTH - 30, 70],
            content:
                '<div class="view"> ' +
                    '<div class="delete">' +
                        '<i class="fa fa-times"></i>' +
                        '<span>Suelta Para Eliminar</span>' +
                    '</div>' +
                    '<div class="content">Item ' + object.content + '</div>' +
                    '<ul class="options">' +
                        '<li><i class="fa fa-heart"></i></li>' +
                        '<li><i class="fa fa-comment"></i></li>' +
                    '</ul>' +
                '</div>',
            classes: ['listview-item']
        });

        for (var i = 0; i < this.listeners.length; i++) {
            this.item.pipe(this.listeners[i]);
        }

        this.view._add(this.item);
    }

    module.exports = ListItemView;
});