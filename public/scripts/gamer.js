var database = firebase.database();
var auth = firebase.auth();

window.onload = function() {
  document.getElementById('createGamer').onclick = create;
};

function create(e) {
  e.preventDefault();

  var gamerName = document.getElementById('name');
  var gamerDescription = document.getElementById('description');
  var currentUser = auth.currentUser;
  var gamersRef = database.ref('gamers');

  // Add a new message entry to the Firebase Database.
  gamersRef.push({
    name: gamerName.value,
    description: gamerDescription.value
  }).then(function() {
    console.log("Jogo cadastrado");
  }.bind(this)).catch(function(error) {
   console.error('Erro ao criar um novo jogo no Firebase Database', error);
  });
}
