define(function(require, exports, module) {
    // Imports
    var View    = require('famous/core/View');
    var Surface = require('famous/core/Surface');

    function ListItemView(params) {
        View.apply(this, arguments);
        var view = new View();
        var listeners = [];

        this.params = params || {
            height: 70
        }

        this.addToView = function(renderable) {
            view.add(renderable);
        }

        this.getAllListeners = function() {
            return listeners;
        }

        this.addListener = function(listener) {
            listeners.push(listener);
        }

        this.getListener = function(index) {
            return listeners[index];
        }

        this.getTotalListeners = function() {
            return listeners.length;
        }

        this.add(view);
    };

    ListItemView.prototype = Object.create(View.prototype);
    ListItemView.prototype.constructor = ListItemView;

    ListItemView.prototype.pipeTo = function(target) {
        this.addListener(target);
    }

    ListItemView.prototype.setContent = function(object) {
        var item = new Surface({
            size: [APP_WIDTH - 30, this.params.height],
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

        for (var i = 0; i < this.getTotalListeners(); i++) {
            item.pipe(this.getListener(i));
        }

        this.addToView(item);
    }

    module.exports = ListItemView;
});