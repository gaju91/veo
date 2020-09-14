const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
var videoElement = 0;


// function to add video stream to DOM
const addVideoStream = (video,stream) => {
    video.srcObject = stream ;
    video.play();
    videoGrid.append(video);
    videoElement++;
    videoReSize();
}

// tmeplate to get user media permission
const getMedia = navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
});

// initialized promise to automatically get user media of host on open
getMedia.then((stream) => {
    const video = document.createElement('video');
    video.muted = true;
    addVideoStream(video,stream)
});

// call made to new user and user media gets forwarded
const callToNewUser = ((userId,stream) => {
    const call = peer.call(userId,stream);
    const video = document.createElement('video');
    call.on('stream',(userVideoStream)=>{
        addVideoStream(video,userVideoStream);
    });
    call.on('close',() =>{
     video.remove();
     videoElement--;
     videoReSize();
    })

    peers[userId] = call;
});

// answer is provided to host with user media of user
const answerToNewUser = ((call,stream) =>{
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream',(userVideoStream) => {
        addVideoStream(video,userVideoStream);
    })
});


