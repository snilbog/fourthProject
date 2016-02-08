var InfiniteScroller = InfiniteScroller || {};

InfiniteScroller.Title = function(){};

InfiniteScroller.Title.prototype = {
  create: function() {
  	this.load.image('backdrop', 'assets/images/backdrop.png');
  	this.backdrop = this.game.add.image(0, 0, 'backdrop');
    this.backdrop.scale.setTo(2);
    
  var title = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Super Awesome Zombie Pulp\n Apocalypse Wow!', { font: '35px Arial', fill: '#ff3333', align: 'center' });
    
    title.anchor.setTo(0.5, 0.5);
    
    this.game.input.onDown.addOnce(this.start, this);
  },
  
  start: function() {
    this.state.start('Preload');
  }
}