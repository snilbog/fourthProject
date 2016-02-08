var InfiniteScroller = InfiniteScroller || {};
 
//loading the game assets
InfiniteScroller.Preload = function(){};
 
InfiniteScroller.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);
 
    this.load.setPreloadSprite(this.preloadBar);
 
    //load game assets

    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('grass', 'assets/images/grass.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('block', 'assets/images/block.png');
    this.load.image('burger', 'assets/images/burger.png');
    
    this.load.spritesheet('zombie', 'assets/images/zombie.png', 46.4, 60);
    this.load.spritesheet('man', 'assets/images/man_walk.png', 16, 24);
    this.load.spritesheet('playerFall', 'assets/images/player_fall.png', 16, 24);
    
    this.load.audio('main', 'assets/audio/main.mp3');
    this.load.audio('jump', 'assets/audio/jump.mp3');
    this.load.audio('hurt', 'assets/audio/hurt.mp3');
    this.load.audio('burger', 'assets/audio/burger.mp3');
    this.load.audio('gameOver', 'assets/audio/gameOver.mp3');
  },
  
  create: function() {
    this.state.start('Game');
  }
};