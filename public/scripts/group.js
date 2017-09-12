var database = firebase.database();
var auth = firebase.auth();

window.onload = function() {
  document.getElementById('createGroup').onclick = create;
};

function create(e) {
  e.preventDefault();

  var groupName = document.getElementById('name');
  var groupDescription = document.getElementById('description');
  var currentUser = auth.currentUser;
  var groupsRef = database.ref('groups');

  // Add a new message entry to the Firebase Database.
  groupsRef.push({
    name: groupName.value,
    description: groupDescription.value
  }).then(function() {
    console.log("Grupo cadastrado");
  }.bind(this)).catch(function(error) {
   console.error('Erro ao criar um novo grupo no Firebase Database', error);
  });
}
