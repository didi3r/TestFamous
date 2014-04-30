define(function(require, exports, module) {
    var View               = require('famous/core/View');
    var Modifier           = require('famous/core/Modifier');
    var Transform          = require('famous/core/Transform');
    var RenderNode         = require('famous/core/RenderNode');
    var Transitionable     = require('famous/transitions/Transitionable');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

    // Custom Views
    var HeaderView = require('views/HeaderView');
    var SideView = require('views/SideView');
    var ListView = require('views/ListView');

    // Constants
    var LATERAL_MENU_WIDTH = 300;
    var LATERAL_MENU_ANIMATION_DURATION = 500;
    
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

        // Create Lateral Menu
        this.sideView = new SideView({
            width: LATERAL_MENU_WIDTH
        });
        
        // Main Layout
        this.layout = new HeaderFooterLayout({
             headerSize: 70,
        });

        // Create Header
        this.header = new HeaderView();
        this.layout.header.add(this.header);
        this.header.pipe(this._eventInput);
        this._eventInput.on('menuToggle', this.menuToggle.bind(this))

        this.list = new ListView();
        this.list.setContent([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

        this.layout.content.add(this.list);

        this.node = new RenderNode();
        this.node.add(new Modifier({transform: Transform.translate(0,0,5)})).add(this.sideView);
        this.node.add(this.layout);
       
        this._add(this.mainTransform).add(this.node);
    };

    App.prototype = Object.create(View.prototype);
    App.prototype.constructor = App;

    App.DEFAULT_OPTIONS = {};

    App.prototype.menuToggle = function() {
        if (!this.sideView.open) {
            this.mainTransitionable.set(LATERAL_MENU_WIDTH, { duration: LATERAL_MENU_ANIMATION_DURATION, curve: 'easeOut' });
            // this.sideView.flipOut();
        }
        else {
            this.mainTransitionable.set(0, { duration: LATERAL_MENU_ANIMATION_DURATION, curve: 'easeOut' });
            // this.sideView.flipIn();
        }
        this.sideView.open = !this.sideView.open;
        console.log('Menu Clicked');
    };

    module.exports = App;
});
