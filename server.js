const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'node_rest_api',
    port: '8889'
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/routes'); //importing route
routes(app); //register the route