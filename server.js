//server.js
var express = require('express');
var app = express();
const request = require('request')
const api_helper = require('./API_helper')
// const  { Server } = require("socket.io");
const http = require('http');
// const server = http.createServer(app);
// const io = new Server(server)
const io = require("socket.io")(8081, {
    path: "/"
  });
const cors = require('cors');
app.use(cors());
app.options('*', cors());

const INDEX = "\\Index.html";


app.get('/', function (req, res) {
    res.send(__dirname+INDEX);
})

app.get('/LuccaLeaves/:ownerId&:date&:paging', (req, res) => {
    res.set('Authorization', 'lucca application=0911d31f-51a4-4bec-a412-f389be7c0b17');
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    var ownerId = req.params.ownerId;
    var date = req.params.date;
    var paging = req.params.paging;

    api_helper.make_API_call('https://i-tracing.ilucca-test.net/api/v3/leaves?leavePeriod.ownerId=' + ownerId + '&date=' + date + '&paging=' + paging)
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})

io.on('connection' ,(socket)=>{
    console.log('a user connected!')
    socket.on('chat message', msg=>{
        io.emit('chat message', "msg: "+msg+", myJSON: ")
    })
})

app.use(express.json());

app.post('/webhook', function(req, res){//Very Important: we receive only the confirmed actions: creation et annulation APPROVEE SEULEMENT
    console.log(req.body); 
    var postData = JSON.stringify(req.body);

    var requestOptions = {
        hostname: 'localhost', // url or ip address
        port: 8088, // default to 80 if not provided
        path: '/integrate',
        method: 'POST', // HTTP Method
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    };
    var externalRequest = http.request(requestOptions, (externalResponse) => {
        externalResponse.setEncoding('utf8');
        externalResponse.on('data', (chuck) => {
        });
        // ServerB done responding
        externalResponse.on('end', () => {
            // Response to client
            res.end('data was send to serverB');
        });
    });
    
    // Free to send anthing to serverB
    externalRequest.write(postData);
    externalRequest.end();
  });

app.listen(process.env.PORT || 8080, function () {
    console.log("Backend Application listening at 8080")
})
/* command: git push origin main*/
