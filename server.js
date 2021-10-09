const http = require("http")
const fs = require("fs").promises
const path = require("path")
const express = require("express")
const Server = require("socket.io")

const CreateServer = function(port){
    const app = express()
    
    app.use(express.static(__dirname))
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html")//res.sendFile(path.join(__dirname, "../HTML/index.html"))
    })
    const httpServer = http.createServer(app)

    console.log("server created")
    const io = Server(httpServer, { })

    io.on("connection", socket => {
        socket.send("Hello from the server")

        socket.on("message", data => {
            console.log(data)
        })
        
    })

    httpServer.listen(port)
    
}

module.exports.CreateServer = CreateServer
