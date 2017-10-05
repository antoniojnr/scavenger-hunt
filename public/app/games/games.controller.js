angular
  .module('scavenger-hunt')
  .controller('GamesController', GamesController);

function GamesController($scope, $mdDialog, $firebaseArray) {
  var vm = this;

  vm.gamers = [];

  vm.hide = function() {
    $mdDialog.hide();
  }

  vm.cancel = function() {
    $mdDialog.cancel();
  }

  vm.loadGames = function() {
  //   // var gamesRef = vm.database.ref('groups');
  //   // gamesRef.off();
  //   //
  //   // var setGames = function(data) {
  //   //   vm.games.push(data.val());
  //   // }.bind(this);
  //   //
  //   // gamesRef.limitToLast(12).on('child_added', setGame);
  //   // gamesRef.limitToLast(12).on('child_changed', setGame);
    var ref = vm.database.ref().child('games');
    vm.games = $firebaseArray(ref);
  };

  vm.save = function(ev) {
    var gameName = ev.name;
    var gameDescription = ev.description;
    var currentUser = vm.auth.currentUser;
    var gameRef = vm.database.ref('games');

  //   // Add a new message entry to the Firebase Database.
    gamersRef.push({
      name: gameName,
      description: gameDescription
    }).then(function() {
      console.log("Jogo cadastrado");
    }.bind(this)).catch(function(error) {
      console.error('Erro ao criar um novo jogo no Firebase Database', error);
    });

    $mdDialog.hide(ev);
  }
  //
  vm.createGame = function(ev) {
    $mdDialog.show({
      controller: GamesController,
      templateUrl: 'app/games/new_game.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen
    })
    .then(function(answer) {
      console.log(answer);
    }, function() {
      console.log("cancelled dialog")
    })
  }

  vm.initFirebase = function() {
    vm.auth = firebase.auth();
    vm.database = firebase.database();
    vm.loadGames();
  }

  vm.initFirebase();
}
