module.exports = (io) =>{
        io.on('connection',(socket)=>{
            socket.on('join-room',(roomId,userId)=>{
                socket.join(roomId);
                // this forward the "new user" event to everybody else except who created it
                // then if person with same id connect it will emit event to every one else
                // except that person so in terms first person who initiated event will get "new user"
                socket.to(roomId).broadcast.emit(`new user`,userId);

                socket.on('disconnect',()=>{
                    socket.to(roomId).broadcast.emit("user-disconnected",userId);
                });

                socket.on("msg",(msgText) => {
                    socket.emit('createmessage',msgText);
                })
    
            });
        })
}