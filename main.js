//Raspizza JS remote Arduino uploader
const fs = require('fs');
const express = require('express')
const portscanner = require('portscanner')
const avrgirl = require("lite-avrgirl-lillypad")
const app = express()

page = '<!DOCTYPE html>' +
'<html lang="en">' +
'  <head>' +
'    <title>BotlyStudio Agent</title>' +
'    <meta charset="utf-8">' +
'    <style>' +
'      body {' +
'        font-family: sans-serif;' +
'      }' +
'' +
'      img {' +
'        width: 245px;' +
'      }' +
'' +
'      #container {' +
'        border: 1px dashed #0000ff;' +
'        border-radius: 6px;' +
'        padding: 5px 15px 15px 15px;' +
'        margin: 30px;' +
'        width: 350px;' +
'        text-align: center;' +
'      }' +
'    </style>' +
'  </head>' +
'  <body>' +
'    <div id="container">' +
'      <h2>BotlyStudio secret agent</h1>' +
'      <p>My name is Studio, BotlyStudio</p>' +
'      <p>I\'m an precompiled .hex uploader</p>' +
'      <p><img src="https://66.media.tumblr.com/1c8951d890769241ea2c626f9a7446bb/tumblr_n4r027wZBd1rr6qpdo1_250.gif" alt="a spy fox"/></p>' +
'      <p> Listenning on port : ';

pageEnd = '</p>' +
'    </div>' +
'  </body>' +
'</html>';

portscanner.findAPortNotInUse(3000, 3080, '127.0.0.1', function(error, port) {
    if(error){
        app.get('/', (req, res) => res.send(error))
    }
    console.log('AVAILABLE PORT AT: ' + port)
    page += port + pageEnd;
    app.listen(port, () => console.log(`Agent listening on port ${port}!`))
})

app.get('/', (req, res) => res.send(page))

app.post('/', function (req, res) {
    res.send('Got a POST request')
})