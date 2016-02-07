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

// var Players = new Meteor.Collection('players');

// var Leaderboard = {};
// Leaderboard.getRandomScore = function () {
//   return Math.floor(Math.random() * 10) * 5;
// };
// Leaderboard.resetPlayers = function () {
//   Players.remove({});
//   var names = [
//     'Neal Fitch',
//   ];
//   for (var i = 0; i < names.length; i += 1) {
//     Players.insert({name: names[i], score: Leaderboard.getRandomScore()});
//   }
// };
// Leaderboard.randomizeScores = function () {
//   Players.find().forEach(function (player) {
//     Players.update(player._id, {$set: {score: Leaderboard.getRandomScore()}});
//   });
// };
// Leaderboard.addPlayer = function (player_name) {
//   var trimmed = $.trim(player_name);
//   if (trimmed.length) {
//     Players.insert({name: trimmed, score: Leaderboard.getRandomScore()});
//   }
// };

// if (Meteor.isClient) {

//   var AmplifiedSession = _.extend({}, Session, {
//     keys: _.object(_.map(amplify.store(), function (value, key) {
//       return [key, JSON.stringify(value)];
//     })),
//     set: function (key, value) {
//       Session.set.apply(this, arguments);
//       amplify.store(key, value);
//     }
//   });

//   Template.navbar.sort_by_is = function (sort_by) {
//     return (AmplifiedSession.get('sort_by') || 'score') === sort_by;
//   };
//   Template.navbar.events({
//     'click .sort_by_score': function () {
//       AmplifiedSession.set('sort_by', 'score');
//     },
//     'click .sort_by_name': function () {
//       AmplifiedSession.set('sort_by', 'name');
//     },
//     'click .randomize': function () {
//       Leaderboard.randomizeScores();
//     },
//     'click .reset': function () {
//       Leaderboard.resetPlayers();
//     },
//     'click .add_user': function (event, template) {
//       var player = template.find('input.player_name');
//       Leaderboard.addPlayer(player.value);
//       player.value = '';
//     }
//   });

//   Template.leaderboard.players = function () {
//     var sort_by = AmplifiedSession.get('sort_by');
//     var sort_options = sort_by === 'name' ? {name: 1, score: 1} : {score: -1, name: 1};
//     return Players.find({}, {sort: sort_options});
//   };

//   Template.player.selected = function () {
//     return AmplifiedSession.equals('selected_player', this._id);
//   };
//   Template.player.is_max = function () {
//     var max = Players.findOne({}, {sort: {'score': -1, name: 1}});
//     return max && max._id === this._id;
//   };
//   Template.player.is_min = function () {
//     var min = Players.findOne({}, {sort: {'score': 1, name: -1}});
//     return min && min._id === this._id;
//   };
//   Template.player.events({
//     'click .increment': function () {
//       Players.update(this._id, {$inc: {score: 5}});
//       return false;
//     },
//     'click .decrement': function () {
//       Players.update(this._id, {$inc: {score: -5}});
//       return false;
//     },
//     'click .remove': function (event, template) {
//       var self = this;
//       $(template.find('tr')).fadeOut('fast', function () {
//         Players.remove(self._id);
//       });
//       return false;
//     },
//     'click': function () {
//       AmplifiedSession.set('selected_player', this._id);
//     }
//   });
//   Template.player.rendered = function () {
//     $(this.findAll('[rel=tooltip]')).tooltip();
//   };
// }

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // On server startup, create some players if the database is empty.
//     if (Players.find().count() === 0) {
//       Leaderboard.resetPlayers();
//     }
//   });
// }


//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });

//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }


