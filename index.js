const firebaseVideo = document.getElementById("firebase-video");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDK9B9NCjSwJJL2ryiy7USK1XRIOzKoh5M",
  authDomain: "nirs-camera.firebaseapp.com",
  databaseURL: "https://nirs-camera.firebaseio.com",
  projectId: "nirs-camera",
  storageBucket: "nirs-camera.appspot.com",
  messagingSenderId: "382258061836",
  appId: "1:382258061836:web:bab2a86d0a88a57cc5c429",
  measurementId: "G-VNNLQ9Y1NN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
function writeImageData(imageId, data) {
    firebase.database().ref('image/' + imageId).set({
        data: data
    });
}
function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email
    });
}
const updateImageSubscription = firebase.database().ref('image/' + "currentImage" + '/data');
updateImageSubscription.on('value', function(data) {
    firebaseVideo.src = data.node_.value_;
    //console.log(data.node_.value_);
});