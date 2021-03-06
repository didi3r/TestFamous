// Constants
var APP_HEIGHT = window.innerHeight;
var APP_WIDTH = window.innerWidth;
var HEADER_HEIGHT = 0.105 * APP_HEIGHT;
var LATERAL_MENU_WIDTH = APP_WIDTH * 0.75;
var LATERAL_MENU_ANIMATION_DURATION = 300;

define(function(require, exports, module) {
    // famous
    var View               = require('famous/core/View');
    var Modifier           = require('famous/core/Modifier');
    var Transform          = require('famous/core/Transform');
    var RenderNode         = require('famous/core/RenderNode');
    var Easing             = require('famous/transitions/Easing');
    var Transitionable     = require('famous/transitions/Transitionable');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

    // backbone
    var Backbone           = require('backbone');

    // Custom Views
    var HeaderView         = require('views/HeaderView');
    var SideView           = require('views/SideView');
    var ListView           = require('views/ListView');
    var TaskListItemView   = require('views/TaskListItemView');

    // Models
    var ItemModel          = require('models/ItemModel');


    function App() {
        View.apply(this, arguments);

        // Create the mainTransforms for shifting the entire view over on menu open
        this.mainTransform = new Modifier({
            transform: Transform.identity
        });

        this.mainTransitionable = new Transitionable(0);
        this.mainTransform.transformFrom(function() {
            return Transform.translate(this.mainTransitionable.get(), 0, 0);
        }.bind(this));

        // Main Layout
        this.layout = new HeaderFooterLayout({
             headerSize: HEADER_HEIGHT,
        });

        // Create Lateral Menu
        this.sideView = new SideView({
            width: LATERAL_MENU_WIDTH
        });

        // Create Header
        this.header = new HeaderView({
            Height: HEADER_HEIGHT
        });
        this.layout.header.add(this.header);
        this.header.pipe(this._eventInput);
        this._eventInput.on('menuToggle', this.menuToggle.bind(this));

        // Content
        this.list = new ListView();
        this.list.pipe(this._eventInput);
        this._eventInput.on('swipe', this.swipeListItem.bind(this));

        this.list.setItemView(TaskListItemView);
        // this.list.setContent([
        //     {content: 'Lorem Ipsum'},
        //     {content: 'Dolor sit amett'},
        //     {content: 'Parsque consequteur'},
        //     {content: 'Lorem Ipsum'},
        //     {content: 'Dolor sit amett'},
        //     {content: 'Parsque consequteur'},
        //     {content: 'Lorem Ipsum'},
        //     {content: 'Dolor sit amett'},
        //     {content: 'Parsque consequteur'},
        // ]);

        var itemCollection = Backbone.Collection.extend({
            model: ItemModel
        });
        var items = new itemCollection([
            {content: 'Lorem Ipsum', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Dolor sit amett', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Parsque consequteur', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Lorem Ipsum', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Dolor sit amett', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Parsque consequteur', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Lorem Ipsum', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Dolor sit amett', date: 'May 18 2014 4:09pm', status: 'Undone'},
            {content: 'Parsque consequteur', date: 'May 18 2014 4:09pm', status: 'Undone'},
        ]);
        this.list.setContent(items);

        this.node = new RenderNode();
        this.node.add(this.sideView);
        this.node.add(this.list);
        this.layout.content.add(this.mainTransform).add(this.node);
        // this.node.add(this.layout);

        this.add(this.layout);
    };

    App.prototype = Object.create(View.prototype);
    App.prototype.constructor = App;

    App.DEFAULT_OPTIONS = {};

    App.prototype.menuToggle = function() {
        if (!this.sideView.open) {
            this.mainTransitionable.set(
                LATERAL_MENU_WIDTH,
                {
                    duration: LATERAL_MENU_ANIMATION_DURATION,
                    curve: Easing.inSine
                }
            );
            // this.sideView.flipOut();
        }
        else {
            this.mainTransitionable.set(
                0,
                {
                    duration: LATERAL_MENU_ANIMATION_DURATION,
                    curve: Easing.outCirc
                }
            );
            // this.sideView.flipIn();
        }
        this.sideView.open = !this.sideView.open;
        console.log('Menu Clicked');
    };

    App.prototype.swipeListItem = function(item) {
        this.list.removeElement(item);
    };

    module.exports = App;
});
