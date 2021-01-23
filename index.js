const ipCam1 = document.getElementById("ip-cam-1");
const led1 = document.getElementById("cam-led-1");
const ipCam2 = document.getElementById("ip-cam-2");
const led2 = document.getElementById("cam-led-2");

buttonLeft = document.getElementById("turn-left");
buttonUp = document.getElementById("turn-up");
buttonRight = document.getElementById("turn-right");
buttonDown = document.getElementById("turn-down");

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
const image1 = database.ref('image/ipcam-new/data');
const image2 = database.ref('image/ipcam2');


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
function setCamAngle(direction, angle) { //direction true is vertical, false is horizontal
  let directionValue = ""
  if (direction) {
    directionValue = 'v-pos';
  } else {
    directionValue = 'h-pos';
  }
  firebase.database().ref(`image/${directionValue}`).once('value')
    .then((data) => {
      let curAngle = data.val().data;
      let newAngle = curAngle + angle;
      if (newAngle >= 0 && newAngle <= 180)
      {
        firebase.database().ref(`image/${directionValue}`).set({
          data: newAngle
        });
      } else {
        alert(`current camera angle ${curAngle} is too ${(angle > 0)?"high":"low"} already`)
        console.log(`current camera angle ${curAngle} is too ${(angle > 0)?"high":"low"} already`);
      }

    });
}
buttonLeft.addEventListener("click", function() {
  buttonLeft.disabled = true;
  setCamAngle(false, 30);
  setTimeout(() => {
    buttonLeft.disabled = false;
  }, 2000)
});
buttonUp.addEventListener("click", function() {
  buttonUp.disabled = true;
  setCamAngle(true, -30);
  setTimeout(() => {
    buttonUp.disabled = false;
  }, 2000)
});
buttonRight.addEventListener("click", function() {
  buttonRight.disabled = true;
  setCamAngle(false, -30);
  setTimeout(() => {
    buttonRight.disabled = false;
  }, 2000)
});
buttonDown.addEventListener("click", function() {
  buttonDown.disabled = true;
  setCamAngle(true, 30);
  setTimeout(() => {
    buttonDown.disabled = false;
  }, 2000)
});