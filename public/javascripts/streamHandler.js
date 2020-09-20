const videoGrid = document.getElementById('video-grid');

// function to add video stream to DOM
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video);
}

// tmeplate to get user media permission
const getMedia = navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
});

// initialized promise to automatically get user media of host on open
let myVideoStream;
getMedia.then((stream) => {
    myVideoStream = stream;
    const video = document.createElement('video');
    video.poster = "/images/profile.jpg";
    video.muted = true;
    addVideoStream(video, stream);
});



// call made to new user and user media gets forwarded
const callToNewUser = ((userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    video.poster = "/images/profile.jpg";
    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    })
    peers[userId] = call;
});

// answer is provided to host with user media of user
const answerToNewUser = ((call, stream) => {
    call.answer(stream);
    const video = document.createElement('video');
    video.poster = "/images/profile.jpg";
    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
    })
});


const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setMuteButton();
    } else {
        setUnmuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
    <i class="mute fas fa-microphone-slash">`

    document.querySelector('#mute_audio').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone">`

    document.querySelector('#mute_audio').innerHTML = html;
}

const playPause = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPause();
    } else {
        setPlay();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setPause = () => {
    const html = `
    <i class="unmute fas fa-play-slash">`

    document.querySelector('#mute_video').innerHTML = html;
}

const setPlay = () => {
    const html = `
    <i class="unmute fas fa-play">`

    document.querySelector('#mute_video').innerHTML = html;
}