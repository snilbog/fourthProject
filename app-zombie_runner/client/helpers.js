var game;

Template.game.helpers({
	game: function() {
 
	  game = new Phaser.Game(746, 420, Phaser.CANVAS, '');
	   
	  game.state.add('Boot', new Boot(game));
	  game.state.add('Title', new Title(game));
	  game.state.add('Preload', new Preload(game));
	  game.state.add('Game', new Game(game));
	  game.state.start('Boot');
	}
});

Players = new Meteor.Collection("players");

if (Meteor.is_client) {
  Meteor.startup(function() {
    Session.set("sort_order", {score: -1, name: 1});
  });

  Template.leaderboard.players = function () {
    return Players.find({}, {sort: Session.get("sort_order")});
  };

  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

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

  Template.player.events = {
    'click': function () {
      Session.set("selected_player", this._id);
    }
  };

  Template.addPlayer.events = {
    'click input.add': function () {
      Players.insert({name: playerName.value, score: Number(playerScore.value)});
    }
  };
}

var randomScore = function() {
  return Math.floor(Math.random()*10)*5;
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Neal Fitch"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: randomScore()});
    }
  });
}