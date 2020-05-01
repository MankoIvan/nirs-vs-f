const socket = io.connect('http://localhost:3000');
let image;

window.addEventListener("load", function(){
    const video = document.getElementById("vid-show"),
    canvas = document.getElementById("vid-canvas")

    navigator.mediaDevices.getUserMedia({ video : true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            setTimeout(() => {
                setInterval(() => {
                    let draw = document.createElement("canvas");
                    draw.width = video.videoWidth;
                    draw.height = video.videoHeight;
                    let context2D = draw.getContext("2d");
                    context2D.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    canvas.innerHTML = "";
                    canvas.appendChild(draw);
                    image = draw.toDataURL("image/png");
                    socket.emit('image', {image: image})
                    
                }, 1000/15); 

            }, 1000)  
        });
});