'user strict';
var sql = require('../db.js');

//User object constructor
var User = function(user){
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.status = user.status;
    this.created_at = new Date();
};
User.createUser = function(newUser, result) {
    sql.query("INSERT INTO users set ?", newUser, function (err, res) {

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
User.getUserById = function(userID, result) {
    sql.query("Select * from users where id = ? ", userID, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
User.login = function(credentials, result) {
    sql.query("Select * FROM users WHERE (status = ? and email = ?)", credentials, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
User.getAllUser = function(result) {
    sql.query("Select * from users", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('users : ', res);

            result(null, res);
        }
    });
};
User.updateById = function(id, user, result){
    sql.query("UPDATE users SET user = ? WHERE id = ?", [user.user, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
User.remove = function(id, result){
    sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= User;