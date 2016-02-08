var game;

Meteor.startup(function() {
  Session.set("sort_order", {score: -1, name: 1});
});

/*-------------- Game -------------------- */

Template.game.helpers({
	game: function() {
 
	  game = new Phaser.Game(746, 420, Phaser.CANVAS, 'game');
	   
	  game.state.add('Boot', new Boot(game));
	  game.state.add('Title', new Title(game));
	  game.state.add('Preload', new Preload(game));
	  game.state.add('Game', new Game(game));
	  game.state.start('Boot');
	}
});

/*-------------- Player -------------------- */

Template.player.helpers({
  selected: function() {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  }
});

Template.player.events = {
  'click': function () {
    Session.set("selected_player", this._id);
  }
};

/*-------------- Leaderboard -------------------- */

Template.leaderboard.helpers({
  players: function() {
    return Players.find({}, {sort: Session.get("sort_order")});
  },

  selected_name: function() {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  }
});

Template.leaderboard.events = {
  'click input.inc': function () {
    Players.update(Session.get("selected_player"), {$inc: {score: 5}});
  },
  'click input.sort': function() {
    var sortOrder = Session.get("sort_order");

    if (Object.keys(sortOrder)[0] == "score") {
      Session.set("sort_order", { name: 1, score: -1 });
    }
    else {
      Session.set("sort_order", { score: -1, name: 1 });
    }
  },
  'click input.randomise': function() {
    Players.find({}).forEach(function(player) {
      Players.update(player, {$set: {score: randomScore()}});
    });
  },
  'click input.delete': function() {
    if (confirm('Are you sure you want to delete the player?')) {
      Players.remove(Session.get("selected_player"));
    }
  }
};

var randomScore = function() {
  return Math.floor(Math.random()*10)*5;
}