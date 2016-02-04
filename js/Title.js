var InfiniteScroller = InfiniteScroller || {};

InfiniteScroller.Title = function(){};

InfiniteScroller.Title.prototype = {
  create: function() {
  	this.load.image('backdrop', 'assets/images/backdrop.png');
  	this.game.add.tileSprite(0, 0, 800, 420, 'backdrop');
    
  var title = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Super Awesome Zombie Ball\n Soccer Apocalypse Wow!\n\nKick any mouse button to Start\n Up to Jump', { font: '35px Arial', fill: '#ff3333', align: 'center' });
    
    title.anchor.setTo(0.5, 0.5);
    
    this.game.input.onDown.addOnce(this.start, this);
  },
  
  start: function() {
    this.state.start('Preload');
  }
}