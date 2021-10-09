const init = function(){
    var test = document.getElementById("test")
    var buffer = document.getElementById("buffer")
    
    test.innerHTML = buffer.value
    //require('dotenv').config()
    /*buffer.addEventListener("input", ev =>{
        if(playerReady){
            player.seekTo(ev.currentTarget.value, true)
        }
        else{
            ev.currentTarget.value = 0
        }
        
    })*/
    buffer.addEventListener("dragend", ev => {
        /*if(playerReady){
            test.innerHTML = "end"
            //player.seekTo(ev.currentTarget.value, true)
            
        }
        else{
            ev.currentTarget.value = 0
        }*/
    })

    //test.innerText = process.env.API_KEY
    //test.innerText = document.getElementById("apiKey").src.replace("API_KEY", env.API_KEY)
    /*document.getElementById("searchbar").addEventListener("input", (ev => {
        test.innerText = "temp"
    }))*/
    

    
    /*document.getElementById("progress_bar").addEventListener("mousemove", ev =>{
        
        console.log(ev.x)
    })

    document.getElementById("progress_bar").addEventListener("mouseout", ev =>{
        
        console.log("mounse out")
    })
    
    document.getElementById("slider").addEventListener("mousedown", ev =>{
        var slider = document.getElementById("slider")
        
    })*/
}

init()