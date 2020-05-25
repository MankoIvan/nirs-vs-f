const ipCam1 = document.getElementById("ip-cam-1");
const led1 = document.getElementById("cam-led-1");
const ipCam2 = document.getElementById("ip-cam-2");
const led2 = document.getElementById("cam-led-2");

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

firebase.initializeApp(firebaseConfig);

const updateImageSubscription1 = firebase.database().ref('image/ipcam1/data');
updateImageSubscription1.on('value', function(data) {
  ipCam1.src = data.node_.value_;
  led1.classList.add("camera__led_on");
  setTimeout(()=>{
    led1.classList.remove("camera__led_on");
  },100)
});
const updateImageSubscription2 = firebase.database().ref('image/ipcam2/data');
updateImageSubscription2.on('value', function(data) {
  ipCam2.src = data.node_.value_;
  led2.classList.add("camera__led_on");
  setTimeout(()=>{
    led2.classList.remove("camera__led_on");
  },100)
});
console.log("hello")