var auth = firebase.auth();

window.onload = function() {
  document.getElementById('login').onclick = login;
  auth.onAuthStateChanged(onAuthStateChanged.bind(this));
};

function onAuthStateChanged(user) {
  var userInfo = document.getElementById('loggedUser');
  if (user) {
    var userName = user.displayName;
    userInfo.innerHTML = userName;
  } else { // User is signed out!
    userInfo.innerHTML = "Faça login";
    console.log('Not logged in');
  }
}

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log("Logged in");
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("Logged in");
    console.log(user);
  }).catch(function(error) {
    console.log("Error", error);

    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
