angular
  .module('scavenger-hunt')
  .controller('GroupsController', GroupsController);

function GroupsController($scope, $mdDialog, $firebaseArray) {
  var vm = this;

  vm.groups = [];

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
    var ref = vm.database.ref().child('groups');
    vm.groups = $firebaseArray(ref);
  };

  vm.save = function(ev) {
    var groupName = ev.name;
    var groupDescription = ev.description;
    var currentUser = vm.auth.currentUser;
    var groupsRef = vm.database.ref('groups');

    // Add a new message entry to the Firebase Database.
    groupsRef.push({
      name: groupName,
      description: groupDescription
    }).then(function() {
      console.log("Grupo cadastrado");
    }.bind(this)).catch(function(error) {
      console.error('Erro ao criar um novo grupo no Firebase Database', error);
    });

    $mdDialog.hide(ev);
  }

  vm.createGroup = function(ev) {
    $mdDialog.show({
      controller: GroupsController,
      templateUrl: 'app/groups/new_group.tmpl.html',
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
    vm.loadGroups();
  }

  vm.initFirebase();
}
