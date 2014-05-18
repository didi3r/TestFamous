define(function(require, exports, module) {
    // Imports
    var Surface = require('famous/core/Surface');
    var ListItemView = require('views/ListItemView');

    function TaskListItemView(params) {
        ListItemView.prototype.constructor.call(this, params);
    }

    TaskListItemView.prototype = new ListItemView();
    TaskListItemView.prototype.constructor = TaskListItemView;

    TaskListItemView.prototype.setContent = function(object) {
        var item = new Surface({
            size: [APP_WIDTH - 30, this._params.height],
            content:
                '<div class="view task-view"> ' +
                    '<div class="delete">' +
                        '<i class="fa fa-times"></i>' +
                        '<span>Suelta Para Eliminar</span>' +
                    '</div>' +
                    '<div class="content">' +
                        '<span class="title">' + object.content + '</span>' +
                        '<div class="group">' +
                            '<span class="date">' + object.date + '</span> ' +
                            '<span class="status">' + object.status + '</span> ' +
                        '</div>' +
                    '</div>' +
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

    module.exports = TaskListItemView;
});
