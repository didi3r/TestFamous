define(function(require, exports, module) {
    var View = require('famous/core/View');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

    // Custom Views
    var HeaderView = require('views/HeaderView');
    var ListView = require('views/ListView');

    function App() {
        View.apply(this, arguments);

        this.layout = new HeaderFooterLayout({
             headerSize: 70,
        });

        this.header = new HeaderView();
        this.layout.header.add(this.header);
        this.header.pipe(this._eventInput);
        this._eventInput.on('menuToggle', this.menuToggle.bind(this))

        this.list = new ListView();
        this.list.setContent([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

        this.layout.content.add(this.list);
       
        this._add(this.layout);
    };

    App.prototype = Object.create(View.prototype);
    App.prototype.constructor = App;

    App.DEFAULT_OPTIONS = {};

    App.prototype.menuToggle = function() {
        // if (!this.sideView.open) {
        //     this.mainTransitionable.set(100, { duration: 500, curve: 'easeOut' });
        //     this.sideView.flipOut();
        // }
        // else {
        //     this.mainTransitionable.set(0, { duration: 500, curve: 'easeOut' });
        //     this.sideView.flipIn();
        // }
        // this.sideView.open = !this.sideView.open;
        console.log('Menu Clicked');
    };

    module.exports = App;
});
