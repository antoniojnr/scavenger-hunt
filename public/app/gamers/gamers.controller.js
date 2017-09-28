angular
  .module('scavenger-hunt')
  .controller('GamersController', GamersController);

function GroupsController($scope, $mdDialog, $firebaseArray) {
  var vm = this;

  vm.gamers = [];

  vm.hide = function() {
    $mdDialog.hide();
  }

  vm.cancel = function() {
    $mdDialog.cancel();
  }

  vm.loadGroups = function() {
    // var groupsRef = vm.database.ref('groups');
    // groupsRef.off();
    //
    // var setGroup = function(data) {
    //   vm.groups.push(data.val());
    // }.bind(this);
    //
    // groupsRef.limitToLast(12).on('child_added', setGroup);
    // groupsRef.limitToLast(12).on('child_changed', setGroup);
    var ref = vm.database.ref().child('gamers');
    vm.gamers = $firebaseArray(ref);
  };

  vm.save = function(ev) {
    var gamerName = ev.name;
    var gamerDescription = ev.description;
    var currentUser = vm.auth.currentUser;
    var gamerRef = vm.database.ref('gamers');

    // Add a new message entry to the Firebase Database.
    gamersRef.push({
      name: gamerName,
      description: gamerDescription
    }).then(function() {
      console.log("Jogo cadastrado");
    }.bind(this)).catch(function(error) {
      console.error('Erro ao criar um novo jogo no Firebase Database', error);
    });

    $mdDialog.hide(ev);
  }

  vm.createGamer = function(ev) {
    $mdDialog.show({
      controller: GamerController,
      templateUrl: 'app/gamers/new_gamer.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
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
    vm.loadGamers();
  }

  vm.initFirebase();
}
