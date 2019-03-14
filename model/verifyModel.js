'user strict';
var sql = require('../db.js');

//VU object constructor
var VU = function(user){
    this.user_id = user.id;
    this.token = user.token;
    this.expire_at = user.expire_at;
};

VU.createVU = function(newVU, result) {
    sql.query("INSERT INTO verify_users set ?", newVU, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
VU.getVUById = function(userID, result) {
    sql.query("Select * from verify_users where user_id = ? ", userID, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

VU.getVUByToken = function(token, result) {
    sql.query("Select * from verify_users where token = ? ", token, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

VU.updateById = function(verified, id, result){
    sql.query("UPDATE verify_users SET verified = ? WHERE user_id = ?", [verified, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= VU;

// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b