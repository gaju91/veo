var socket = io('/');

var peer = new Peer(undefined,{
    path : '/peerjs',
    host : '/',
    port : '3000'
});

var peers = {};
// open up the connection;
peer.on('open', userId => {
    // this user id is hosts user id
    socket.emit('join-room',RoomId,userId);
}) 

// when new user join;
socket.on('new user',(userId)=>{
    //this user id is new user's user id 
    //get user media of host and forward it to new user
    getMedia.then((stream)=>callToNewUser(userId,stream));
})

peer.on('call',(call) => {
    getMedia.then((stream)=> {
        answerToNewUser(call,stream)
    })
})

socket.on("user-disconnected",(userId)=>{
    if(peers[userId]) peers[userId].close();
})