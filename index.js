require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const router = require('./routes/router.js');


const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/small'));
app.use(express.static('uploads'));
app.set('views', path.join(__dirname, '/views/'));

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/plugger?authSource=admin`, { useNewUrlParser: true })
    .then(() => {
        console.log('Connection established to db');
    })
    .then(() => appListen())
    .catch((e) => {
        console.log('Connection to db failed because:', e);
    });
app.use('/', router);  

function appListen() {
    https.createServer(options, app).listen(3000);
    http.createServer((req, res) => {
        res.writeHead(301, { 'Location': 'https://localhost:3000' + req.url });
        res.end();
    }).listen(8001);
}