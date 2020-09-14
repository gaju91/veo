
function videoReSize() {
    var gridPrompt = videoElement;
    /* New Stuff */
    //style(width,height);
}

function style(width,height){

    let style = document.createElement('style');
    style.innerHTML = `video {
        width : ${width};
        height : ${height};
    }`

    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style,ref);
}

