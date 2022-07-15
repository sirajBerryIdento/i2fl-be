//server.js
var express = require('express');
var app = express();
const request = require('request')
const api_helper = require('./API_helper')

const cors = require('cors');
app.use(cors());
app.options('*', cors());


app.get('/', function (req, res) {
    res.send('Hello World');
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
            console.log("res: ", response)
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})

// app.post('/webhook', (req, res) => {
//     res.set('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');

//     request.post("http://localhost:3000/webhook", {
//         formData: {"user":"KJHKJH","password":"SFD"}, rejectUnauthorized: false
//     }, function optionalCallback(err, httpResponse, b) {
//         if (err) {
//             return console.error('upload failed:', err);
//         }
//         res.send(b)
//     });
// })


app.post('/webhook', function(req, res){
    let myJson = req.body;    
    console.log("myJson", myJson)
      res.send(myJson);	 // echo the result back
  });


app.get("/posts", (req, res) => {
    res.set('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    request.get("https://jsonplaceholder.typicode.com/posts", {
        formData: {
            body: "body",
            title: "title",
            userId: "userId"
        }, rejectUnauthorized: false
    }, function optionalCallback(err, httpResponse, b) {
        if (err) {
            return console.error('upload failed:', err);
        }
        res.send(b)
    });
})

app.listen(process.env.PORT || 8080, function () {
    console.log("Backend Application listening at 8080")
})
/* command: git push origin main*/