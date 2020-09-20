let text = $('input');

console.log(text.val());
console.log("In chathandler");

$('html').keydown((key) => {
    if (key.which == 13 && text.val().length > 0) {
        socket.emit('msg',text.val());
        console.log(text.val());
        text.val('');
    }
})

socket.on('createmessage',text => {
    $('.messages').append(`<li class="message"><b>user</b><br/>${text}`);
    scrollBottom();
})

const scrollBottom = () => {
    const d = $('.main_chat');
    d.scrollTop(d.prop('scrollHeight'));
}