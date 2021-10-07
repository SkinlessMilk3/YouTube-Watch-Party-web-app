const init = function(){
    var test = document.getElementById("test")
    test.innerText = "started init"

    //require('dotenv').config()
    
    test.innerText = "finished config"
    //test.innerText = process.env.API_KEY
    //test.innerText = document.getElementById("apiKey").src.replace("API_KEY", env.API_KEY)
    /*document.getElementById("searchbar").addEventListener("input", (ev => {
        test.innerText = "temp"
    }))*/
    test.innerText = "finished init"

    document.getElementById("progress_bar").addEventListener("mousemove", ev =>{
        
        console.log(ev.x)
    })

    document.getElementById("progress_bar").addEventListener("mouseout", ev =>{
        
        console.log("mounse out")
    })
    
    document.getElementById("slider").addEventListener("mousedown", ev =>{
        var slider = document.getElementById("slider")
        
    })
}

init()