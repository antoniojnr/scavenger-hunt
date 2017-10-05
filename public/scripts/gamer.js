var database = firebase.database();
var auth = firebase.auth();

window.onload = function() {
  document.getElementById('createGame').onclick = create;
};

function create(e) {
  e.preventDefault();

  var gameName = document.getElementById('name');
  var gameDescription = document.getElementById('description');
  var currentUser = auth.currentUser;
  var gamesRef = database.ref('games');

  // Add a new message entry to the Firebase Database.
  gamesRef.push({
    name: gameName.value,
    description: gameDescription.value
  }).then(function() {
    console.log("Jogo cadastrado");
  }.bind(this)).catch(function(error) {
   console.error('Erro ao criar um novo jogo no Firebase Database', error);
  });
}
