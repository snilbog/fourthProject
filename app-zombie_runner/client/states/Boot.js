Boot = function(game){
  this.game = game;
};
 
Boot.prototype = {
  preload: function() {
    
    this.load.image('backdrop', 'assets/images/backdrop.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
 
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  
    this.state.start('Title');
  },
};