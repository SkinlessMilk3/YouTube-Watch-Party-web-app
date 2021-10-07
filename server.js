const http = require("http")
const fs = require("fs").promises
const path = require("path")
const express = require("express")
const app = express()

const CreateServer = function(port){

    app.listen(port, () => {
        console.log(`Applicaton started and listening on port ${port}`)
    })

    app.use(express.static(__dirname))//app.use(express.static(path.join(__dirname, "JavaScript/")))
    
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "index.html")//res.sendFile(path.join(__dirname, "../HTML/index.html"))
    })
    
}

module.exports.CreateServer = CreateServer
