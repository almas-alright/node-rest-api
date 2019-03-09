'use strict';

var User = require('../model/userModel.js');
var jwt = require('jsonwebtoken');
exports.list_all_users = function(req, res) {
    User.getAllUser(function(err, user) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};



exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);

    //handles null error
    if(!new_user.name || !new_user.email){

        res.status(400).send({ error:true, message: 'Please provide name/email' });

    }
    else{

        User.createUser(new_user, function(err, user) {

            if (err)
                res.send(err);
            res.json(user);
        });
    }
};


exports.read_a_user = function(req, res) {
    User.getUserById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.login_a_user = function(req, res) {
    var password = req.body.password;
    User.login([1, req.body.email], function(err, user) {
        if (err){
            res.send(err);
        } else {
            if(user.length){
                if(password === user[0].password){
                    // res.json({id:user[0].id,name:user[0].name, email:user[0].email, message:"Login Success"});
                    var uxr = {id:user[0].id, email: user[0].email}
                    jwt.sign(
                        {uxr},
                        process.env.HASH_SECRET,
                        // { expiresIn: '360s' },
                        (err, token) => {
                        res.json({
                            token
                        });
                    });
                } else {
                    res.json({message:"Wrong Password"});
                }
            } else {
                res.json({message:"No user found with this email : "+req.body.email});
            }

        }

    });
};

exports.verifyAD = (req,res) => {
    jwt.verify(req.token, process.env.HASH_SECRET, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
}

exports.update_a_user = function(req, res) {
    User.updateById(req.params.userId, new User(req.body), function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_a_user = function(req, res) {


    User.remove( req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};