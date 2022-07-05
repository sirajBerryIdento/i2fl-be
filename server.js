//server.js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

const api_helper = require('./API_helper')
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


app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
})