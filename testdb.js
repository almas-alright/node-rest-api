var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'node_rest_api',
    port: '8889'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});