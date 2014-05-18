define(function(require, exports, module) {
    // Imports
    var View    = require('famous/core/View');
    var Surface = require('famous/core/Surface');

    function ListItemView(params) {
        View.apply(this, arguments);
        this._view = new View();
        this._listeners = [];

        this._params = params || {
            height: 70
        };

        this.add(this._view);
    }

    ListItemView.prototype = Object.create(View.prototype);
    ListItemView.prototype.constructor = ListItemView;

    ListItemView.prototype.pipeTo = function(target) {
        this._listeners.push(target);
    };

    ListItemView.prototype.setContent = function(object) {
        var item = new Surface({
            size: [APP_WIDTH - 30, this._params.height],
            content:
                '<div class="view"> ' +
                    '<div class="delete">' +
                        '<i class="fa fa-times"></i>' +
                        '<span>Suelta Para Eliminar</span>' +
                    '</div>' +
                    '<div class="content">' + object.content + '</div>' +
                    '<ul class="options">' +
                        '<li><i class="fa fa-heart"></i></li>' +
                        '<li><i class="fa fa-comment"></i></li>' +
                    '</ul>' +
                '</div>',
            classes: ['listview-item']
        });

        for (var i = 0; i < this._listeners.length; i++)
            item.pipe(this._listeners[i]);

        this._view.add(item);
    };

    module.exports = ListItemView;
});
