'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const request = require('request');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

let tokens = [];

// App
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/token', (req, res) => {
    if (req.body && req.body.token !== undefined) {
        tokens.push(req.body.token);

        // Save token to simple txt file
        fs.appendFile('/var/www/html/tokens.txt', req.body.token + "\n", function (err) {
        });

        // Crawl some user data with the token
        // Would work in real life, but in the networking setup for docker it does not
        /* const requestOptions = {
             url: 'http://backend.thi-app.test/api/v1/students/me/',
             method: 'GET',
             headers: {
                 'Authorization': req.body.token
             },
             json: {},
         };
         request(requestOptions, (err, response, body) => {
             if (err) {
                 console.log(err);
             } else if (response.statusCode === 200) {
                 console.log(body);
                 // Save User Data in own file
                 fs.appendFile('/var/www/html/' + body.data[0].id + '.json', JSON.stringify(body), function (err) {
                 });
             } else {
                 console.log(response.statusCode);
             }
         });*/

        res.send('Collected token: ' + req.body.token);
    } else {
        res.send('No token provided to store');
    }

});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});