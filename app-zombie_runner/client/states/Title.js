Title = function(game){
  this.game = game;
};

Title.prototype = {
  preload: function() {
    this.load.audio('intro', 'assets/audio/intro.mp3');
    this.load.image('backdrop', 'assets/images/backdrop.png');
  },

  create: function() {
    this.backdrop = this.game.add.image(0, 0, 'backdrop');
    this.backdrop.scale.setTo(2);

    this.introTrack = this.game.add.audio('intro', 1, true);
    this.introTrack.play(); 
  
  var pretitle = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Jamuel L. Sackson\n Presents', {font: '15px Arial', fill: '#000000', align: 'top'});  
  var title = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Low Pulp NonFiction!', { font: '35px Arial', fill: '#ff3333', align: 'center' });
  var score = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Original Score\n by\n Hero', { font: '15px Arial', fill: '#000000', align: 'center' });
    pretitle.anchor.setTo(0.5, 1.9);
    title.anchor.setTo(0.5, 0.5);
    score.anchor.setTo(0.5, -1.5);

    this.game.input.onDown.addOnce(this.start, this);
  },
  
  start: function() {
    this.introTrack.destroy();
    this.state.start('Preload');
  }
}