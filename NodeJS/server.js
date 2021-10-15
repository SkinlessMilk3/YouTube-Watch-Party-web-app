const http = require("http")
const fs = require("fs").promises
const path = require("path")
const express = require("express")
const Server = require("socket.io")
const mySql = require("mysql")
const ws = require("ws")

var con

const CreateServer = function(port){
    
    const app = express()
    var fname = path.join(__dirname, "../Assets")

    app.use(express.static(fname))

    app.use(express.urlencoded({extedned: false}))

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../Assets/HTML/index.html"))
    })

    app.post("/", (req, res) => {
        
        var data = req.body
        if(data["email"].trim() != "" & data["username"].trim() != ""){
            ConnectToDatabase(data)
        }
    })

    const httpServer = http.createServer(app)
    
    const io = Server(httpServer)
    
    io.on("connection", socket => {
        
        messagesInit(socket, io)
        socket.emit("Hello", "Welcome to the server!")
        io.sockets.emit("time query")
    })

    httpServer.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}

const messagesInit = function(socket, io){
    
    socket.on("message", data => {
        io.sockets.emit("message", data)
        //socket.broadcast.emit("message", data)
        console.log("server received message: ", data)
    })

    socket.on("play", () => {
        //send message to everybody
        io.sockets.emit("play")
        console.log("Server received play message")
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

const ConnectToDatabase = function(data){
    con = mySql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "YouTube_Web_App"
    })

    con.connect(err => {
        if(err) throw err

        console.log("Connected to Database")
    })

    PushToDatabase(data)

    con.end()
}

const PushToDatabase = function(data){

    var sql = `INSERT INTO userInfo(email, username) VALUES(\"${data["email"]}\", \"${data["username"]}\");`
    con.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
    })
}

module.exports.CreateServer = CreateServer
