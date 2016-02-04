var InfiniteScroller = InfiniteScroller || {};

InfiniteScroller.Game = function(){};

InfiniteScroller.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
    },
  create: function() {

    this.background = this.game.add.tileSprite(0, 0, 1024, 1024, 'background');
    this.background.scale.setTo(1, 0.3);
    this.ground = this.add.tileSprite(0,this.game.world.height-10, this.game.world.width, 10, 'ground');
    this.grass = this.add.tileSprite(0,this.game.world.height-15,this.game.world.width,5,'grass');
    this.player = this.game.add.sprite(this.game.width/2, this.game.height-500, 'man');
    this.player.animations.add('walk', [4, 5, 6, 7], 10, true);
    this.player.animations.add('playerFall' [0, 4, 8, 12], 10, true);

    this.game.world.bringToTop(this.ground);
    this.game.world.bringToTop(this.grass);
    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.ground);
    this.player.body.gravity.y = 1700;
    this.player.scale.setTo(3);
    this.player.body.setSize(4, 21, 0, 0);
    //this.player.body.immovable = true;
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    var playerFallImg = this.game.cache.getImage('playerFall');
    this.player.animations.add('fall');
    this.player.fallDimensions = {width: playerFallImg.width, height: playerFallImg.height};
    this.player.standDimensions = {width: this.player.width, height: this.player.height};
    this.player.anchor.setTo(0.5, 1);
    
    this.player.animations.play('walk');
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    this.swipe = this.game.input.activePointer;

    this.soundTrack = this.game.add.audio('main', .7, true);
    this.soundTrack.play();
    this.jumpTrack = this.game.add.audio('jump', 1, false);
    this.hurtTrack = this.game.add.audio('hurt', 1, false);
    this.gameOverTrack = this.game.add.audio('gameOver', 1, false);

    this.tackles = 5;
    this.wraps = 0;
    this.points = 0;
    this.wrapping = true;
    this.stopped = false;
    this.maxfalls = 5;
    
    //create an array of possible toys that can be gathered from toy mounds
    // var bottle = this.game.add.sprite(0, this.game.height-100, 'bottle');
    // var ball = this.game.add.sprite(0, this.game.height-100, 'ball');
    // bottle.visible = false;
    // ball.visible = false;
    // this.toys = [bottle, ball];
    // this.currentToy = bottle;
    
  
    var style1 = { font: "20px Arial", fill: "#ff0"};
    var t1 = this.game.add.text(10, 20, "Points:", style1);
    this.t2 = this.game.add.text(this.game.width-300, 20, "Remaining Tackles: " + this.tackles, style1);
    t1.fixedToCamera = true;
    this.t2.fixedToCamera = true;

    var style2 = { font: "20px Arial", fill: "#00ff00"};
    this.pointsText = this.game.add.text(80, 18, "", style2);
    this.refreshStats();
    this.pointsText.fixedToCamera = true;

    this.generateBlock();
    this.generateEnemies();
    this.generateZombies();
    this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.releaseEnemies, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.releaseZombies, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 1.8, this.releaseBlock, this);

  },
  
  update: function() {
    //movement
    this.background.tilePosition.x -= 1.5;
    this.ground.tilePosition.x -= 5.5;
    this.grass.tilePosition.x -= 5.5;

    //collision
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.enemies, this.enemyHit, null, this);
    this.game.physics.arcade.collide(this.player, this.zombies, this.zombieHit, null, this);
    this.game.physics.arcade.collide(this.player, this.blocks)
    if(this.player.alive && !this.stopped) {
      
       if(!this.wrapping && this.player.x < this.game.width) {

        this.wraps++;
        
        this.wrapping = true;
        
        this.enemies.destroy();
        this.zombies.destroy();
        
        this.game.world.bringToTop(this.grass);
        this.game.world.bringToTop(this.ground);
      }
      else if(this.player.x >= this.game.width) {
        this.wrapping = false;
      }
      
      if (this.swipe.isDown && (this.swipe.positionDown.y > this.swipe.position.y)) {
        this.playerJump();
      }
      else if (this.cursors.up.isDown) {
        this.playerJump();
      }
    }

    this.points += Phaser.Timer.SECOND / 1000;
    this.refreshStats();
  },

  refreshStats: function() {
    this.pointsText.text = this.points;
    this.t2.text = "Remaining Tackles: " + this.tackles;
  },
  
  enemyHit: function(player, enemy) {
    enemy.destroy();

    this.points+= 100;
    this.tackles--;
    this.refreshStats();
    
    this.player.animations.play('fall');
    
    this.hurtTrack.play();
    
    this.stopped = true;
    this.player.body.velocity.x = 0;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.playerFall, this);
  },
  zombieHit: function(player, zombie) {
    zombie.destroy();

    this.points+= 100;
    this.tackles--;
    this.refreshStats();
    
    this.player.animations.play('fall');
    
    this.hurtTrack.play();
    
    this.stopped = true;
    this.player.body.velocity.x = 0;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.playerFall, this);
  },
  
  gameOver: function() {
    this.game.state.start('Title');
  },
 
  playerJump: function() {
    if(this.player.body.touching.down) {
      this.points+= 100;
      this.refreshStats();
      this.player.body.velocity.y -= 700;
      this.jumpTrack.play();
    }    
  },

  currentToyInvisible: function() {
    this.currentToy.visible = false;
  },
  playerFall: function() {
    
    this.stopped = false;
    
    if (this.tackles <= 0) {
      this.player.alive = false;
      this.soundTrack.destroy();
      this.gameOverTrack.play();
      this.player.animations.play('walk');
      this.player.scale.x = -3;
      this.player.body.velocity.x = -500;

      this.game.time.events.add(2500, this.gameOver, this);
    } else {
      this.player.animations.play('walk');
    }
  },

  releaseEnemies: function() {
    var enemy = this.enemies.getFirstExists(false);
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
    enemy.scale.setTo(-0.5, 0.5);
    console.log(enemy.body.width, enemy.body.height);
    enemy.reset(this.game.world.width, this.game.height-110);
    enemy.body.velocity.x = this.game.rnd.integerInRange(-900, -450);
  },
 
  generateEnemies: function() {
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.createMultiple(10, 'enemy');
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.enemies.callAll('body.setSize', 'body', 45, 50, 0, 0);
    this.enemies.setAll('scale.x', -1);
  },

  releaseZombies: function() {
    var zombie = this.zombies.getFirstExists(false);
    zombie.checkWorldBounds = true;
    zombie.outOfBoundsKill = true;
    zombie.scale.setTo(1.2);
    zombie.reset(this.game.world.width, this.game.height-50);
    zombie.body.velocity.x = this.game.rnd.integerInRange(-300, -150);
    var zwalk = zombie.animations.add('zwalk', [3, 4], 10, true);
    zombie.animations.play('zwalk');
  },

  generateZombies: function() {
    this.zombies = this.game.add.group();
    this.zombies.enableBody = true;
    this.zombies.physicsBodyType = Phaser.Physics.ARCADE;
    this.zombies.createMultiple(10, 'zombie');
    this.zombies.setAll('anchor.x', 0.5);
    this.zombies.setAll('anchor.y', 0.5);
    this.zombies.callAll('body.setSize', 'body', 20, 60, 0, 0);
    
  },

  releaseBlock: function() {
    var block = this.blocks.getFirstExists(false);
    block.checkWorldBounds = true;
    block.outOfBoundsKill = true;
    block.body.immovable = true;
    block.scale.setTo(1);
    block.reset(this.game.world.width, this.game.height-100);
    block.body.velocity.x = this.game.rnd.integerInRange(-300, -100);
  },

  generateBlock: function() {
    this.blocks = this.game.add.group();
    this.blocks.enableBody = true;
    this.blocks.physicsBodyType = Phaser.Physics.ARCADE
    this.blocks.createMultiple(5, 'block');
    this.blocks.setAll('anchor.x', 0.5);
    this.blocks.setAll('anchor.y', 0.5);
    this.blocks.callAll('body.setSize', 'body', 96, 33, 0, 0);
  },
    
  //   var block = platforms.create(400, 400, 'block');
  //   block.body.immovable = true;
  //   ledge = platforms.create(-150, 250, 'block');
  //   block.body.immovable = true;
  //   this.game.camera.follow(this.player);
  //   this.block = this.add.tileSprite(0,this.game.world.height-15,this.game.world.width,5,'block');


  render: function(){
         // for (var i = 0; i < this.enemies.children.length; i++) {
         //  this.game.debug.body(this.enemies.children[i]);
         // }
         // for (var i = 0; i < this.zombies.children.length; i++) {
         //  this.game.debug.body(this.zombies.children[i]);
         // }
         // this.game.debug.body(this.player);   
    }
};