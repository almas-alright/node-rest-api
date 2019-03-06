'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'node_rest_api',
    port: '8889'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;