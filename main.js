//Raspizza JS remote Arduino uploader
const fs            = require('fs');
const express       = require('express')
var   cors          = require('cors')
const portscanner   = require('portscanner')
const bodyParser    = require("body-parser");
const avrgirl       = require("lite-avrgirl-lillypad")
const app           = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var Blink = "void setup() {pinMode(13, OUTPUT);}void loop() {digitalWrite(13, HIGH);delay(1000);digitalWrite(13, LOW);delay(1000);}"

page = '<!DOCTYPE html>' +
    '<html lang="fr">' +
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
    '      <p><img src="https://66.media.tumblr.com/1c8951d890769241ea2c626f9a7446bb/tumblr_n4r027wZBd1rr6qpdo1_250.gif" alt="a spy fox"/></p>' +
    '      <p> Listenning on port : ';

pageEnd = '</p>' +
    '      <form>' +
    '       <input name="code" type="hidden" value="' + Blink + '">' +
    '       <input name="type" type="hidden" value="upload">' +    
    '       <button type="submit" formmethod="post">Upload Blink.ino</button>' +
    '      </form>' +
    '    </div>' +
    '  </body>' +
    '</html>';

portscanner.findAPortNotInUse(3000, 3000, '127.0.0.1', function (error, port) {
    if (error) {
        app.get('/', (req, res) => res.send(error))
    }
    console.log('AVAILABLE PORT AT: ' + port)
    page += port + pageEnd;
    app.listen(port, () => console.log(`Agent listening on port ${port}!`))
});




app.get('/', (req, res) => res.send(page))

app.post('/', function (req, res) {
    var type = req.body.type;
    var code= req.body.code;
    if(type == "check"){
        res.end("OK");
        return;
    }else if(type == "upload"){
        console.log(type);
        console.log(code);
        res.end("Uploading...");
        return;
    }else if(type == "ide"){
        console.log(type);
        console.log(code);
        res.end("Opening...");
        return;
    }else{
        res.end("Unknown request")
        console.log(req.body);
        return;
    }
});