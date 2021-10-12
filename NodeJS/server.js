const http = require("http")
const fs = require("fs").promises
const path = require("path")
const express = require("express")
const Server = require("socket.io")
const mySql = require("mysql")

const CreateServer = function(port){
    
    const app = express()
    var fname = path.join(__dirname, "../JS")
    
    app.use(express.static(fname))

    //not sending css
    fname = path.join(__dirname, "../CSS")
    app.use(express.static(fname))

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../HTML/index.html"))
    })
    const httpServer = http.createServer(app)

    const io = Server(httpServer)

    io.on("connection", socket => {
        
        messagesInit(socket, io)
        io.sockets.emit("time query")
    })

    httpServer.listen(port)
    console.log(`Listening on port ${port}`)
}

const messagesInit = function(socket, io){
    
    socket.on("message", data => {
        console.log(data)
    })

    socket.on("play", () => {
        //send message to everybody
        io.sockets.emit("play")
    })

    socket.on("pause", () => {
        //send message to everybody
        io.sockets.emit("pause")
    })
    
    socket.on("seek", time => {
        
        io.sockets.emit("seek", time)
    })

    socket.on("time synch", data => {
        io.sockets.emit("time synch", data)
    })
}

const ConnectToDatabase = function(){
    const con = mySql.createConnection({
        host: "localhost",
        user: "ethcseib",
        password: "password"
    })

    con.connect(err => {
        if(err) throw err

        console.log("Connected to Database")
    })
}

module.exports.CreateServer = CreateServer
