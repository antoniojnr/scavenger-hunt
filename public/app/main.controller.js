(function() {
  'use strict';

  angular
    .module('scavenger-hunt')
    .controller('MainController', MainController);

  function MainController($scope, $mdSidenav, $location, $mdDialog) {
    var vm = this;

    vm.signIn = function() {
      var provider = new firebase.auth.GoogleAuthProvider();

      vm.auth.signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
      }).catch(function(error) {
        console.log("Error", error);

        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
    }

    vm.signOut = function() {
      vm.auth.signOut();
      vm.closeSidenav();
    }

    vm.initFirebase = function() {
      // Shortcuts to Firebase SDK features.
      vm.auth = firebase.auth();
      vm.database = firebase.database();

      // Initiates Firebase auth and listen to auth state changes.
      vm.auth.onAuthStateChanged(vm.onAuthStateChanged.bind(this));
    }

    vm.onAuthStateChanged = function(user) {
      $scope.$apply(function() {
        if (user) {
          vm.photoUrl = user.photoURL;
          vm.userName = user.displayName;
          vm.email = user.email;
          vm.loggedIn = true;
          console.log('should redirect to home');
          $location.path('/home');
        } else {
          vm.loggedIn = false;
          $location.path('/login');
        }
      });
    }

    vm.openSidenav = function() {
      return $mdSidenav('navBar').toggle();
    }

    vm.closeSidenav = function() {
      console.log('close');
      $mdSidenav('navBar')
        .close()
        .then(function () {
          console.log("toggled");
        });
    }

    vm.initFirebase();
  } //MainController
})();
