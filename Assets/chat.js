const chatInit = function(){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var message = document.getElementById("message");
    var sendBtn = document.getElementById("sendBtn");
    var chat_window = document.getElementById("chat_window")
    var username = document.getElementById("username");
    
    socket.on("message", data => {
        chat_window.innerHTML += data;
        console.log(`message received: ${data}`)
    })
    
    

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

    sendBtn.addEventListener("click", ev => {
        socket.emit("message", `<p>${username.value}: ${message.value}</p>`);
        console.log("Message sent")
    })

    document.getElementById("userInfoSubmission").addEventListener("click", ev => {
        modal.style.display = "none"
    })
}

chatInit()