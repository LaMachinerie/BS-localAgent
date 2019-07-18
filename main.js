//Raspizza JS remote Arduino uploader

//Web interaction library
const express       = require('express')
const bodyParser    = require('body-parser')
const app           = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    '       <button type="submit" formaction="/upload" formmethod="post">Upload Blink.ino</button>' +
    '      </form>' +
    '    </div>' +
    '  </body>' +
    '</html>';

var port = 3000;
page += port + pageEnd;
app.listen(port);


app.get('/', (req, res) => res.send(page))

app.post('/', function (req, res) {
    res.end("OK");
});

app.post('/upload', function (req, res) {
    var code= req.body.code;

    console.log(code);
    res.end("compiling : \n" + code);
});
