//Raspizza JS remote Arduino uploader

//Web interaction library
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')
const app           = express();

const fs            = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var path = require('path');
var basepath = path.resolve(__dirname);

console.log(basepath);

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
    '       <input name="type" type="hidden" value="compile">' +    
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

app.post('/compile', function (req, res) {
    var base64encoded = req.body.data;
    var code = Blink;
    if(base64encoded != undefined){
      code = Buffer.from(base64encoded, 'base64').toString('utf8');
      try { fs.writeFileSync(basepath + '/sketch/sketch.ino', code, 'utf-8'); }
      catch (e) { console.log('Failed to save the file : '); console.log(e); res.end("fail"); return;}
    }

    console.log(code);
    Builder.compile(res);
    //res.end(code);
});





/************************************************
*
*
*					Builder
*
*
*
*************************************************
*/

var Builder = {};
const executablePath = "~/../opt/BS-localAgent/compile.sh";


Builder.compile = function (res) {
  script = executablePath;

  var child = require('child_process').exec;

  child(script, function (err, data) {
    console.log(err)
    var hex = undefined;
    try {
        hex = fs.readFileSync(basepath + '/build/sketch.ino.hex');
        console.log(hex);
    } catch (error) {
        err = error;
    }

    if(err){
        res.end("fail");
        console.log(err);
    }
    else
        res.end(hex);
  });
}
