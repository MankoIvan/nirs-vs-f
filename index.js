const ipCam1 = document.getElementById("ip-cam-1");
const led1 = document.getElementById("cam-led-1");
const ipCam2 = document.getElementById("ip-cam-2");
const led2 = document.getElementById("cam-led-2");
const switchButton = document.getElementById("switch-button");
const cameraNumberField = document.getElementById("camera-number");


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

const database = firebase.database();
const cameranumber = database.ref('image/ipcamnum');
const image1 = database.ref('image/1before')
const image2 = database.ref('image/1after')


image1.on('value', function(data) {
  ipCam1.src = data.node_.value_;
  led1.classList.add("camera__led_on");
  setTimeout(()=>{
    led1.classList.remove("camera__led_on");
  },100)
});

image2.on('value', function(data) {
  ipCam2.src = data.node_.value_;
  led2.classList.add("camera__led_on");
  setTimeout(()=>{
    led2.classList.remove("camera__led_on");
  },100)
});

console.log("hello");
function identifyDefaultCamera() {
  cameranumber.once('value').then(function(val) {  
    cameraNumberField.innerText = "№" + Number(val.node_.value_.substr(5));
  });
}
identifyDefaultCamera()


switchButton.addEventListener('click', () => {
  cameranumber.once('value').then(function(val) {
    let newValue = Number(val.node_.value_.substr(5)) % 2 + 1;    
    cameraNumberField.innerText = "№" + newValue;
    cameranumber.set("ipcam" + newValue);
  });
});