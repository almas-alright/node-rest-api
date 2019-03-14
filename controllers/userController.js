'use strict';

var User = require('../model/userModel.js');
var VU = require('../model/verifyModel.js');
var mailTo = require('../mail/email');
var jwt = require('jsonwebtoken');
var moment = require('moment');
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

                var expire_at = moment().add(24, 'hours').format("YYYY-MM-DD HH:mm:ss");
                var token = Buffer.from(user+'.'+process.env.HASH_SECRET).toString('base64');
                var vu = new VU({id:user,token:token,expire_at:expire_at});
                mailTo.mailTo(new_user.email, token)
                VU.createVU(vu, function(err2, vr){
                    if (err)
                        res.send(err2);
                    res.json({ token });
                });

        });
    }
};


exports.check_a_user = function(req, res, next) {
    var new_user = new User(req.body);
    if(!new_user.name || !new_user.email){

        res.status(400).send({ error:true, message: 'Please provide name/email' });

    } else {
        User.isExistsByEmail(new_user.email, (err, row) => {
            if (err)
                res.send(err);
            if(row.length > 0){
                res.status(400).send({ error:true, message: 'user already exists with this email '+new_user.email });
            } else {
               next();
            }
        });
    }

}

exports.activate_a_user = function(req, res){

    var ac_code = Buffer.from(req.body.card, 'base64').toString('ascii');
    var card = ac_code.split(".");
    VU.getVUByToken(req.body.card,function(err, vu){
        if (err)
            res.send(err);
        if(!vu.length){
            res.status(400).send({ error:true, message: 'invalid activation code DDX' });
        } else {

            if(vu[0].verified === 0){
                User.updateById('1', card[0], function (err2, resUser) {
                    if (err2)
                        res.send(err2);
                    VU.updateById('1', card[0], function (err3, resUser2) {
                        if (err3)
                            res.send(err3);
                        res.json({ error:false, message: 'activation success' })
                    })
                })
            } else {
                res.status(400).send({ error:true, message: 'activation code expired' });
            }
        }

    });
}

exports.read_a_user = function(req, res) {
    User.getUserById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.login_a_user = function(req, res) {
    var password = req.body.password;
    User.login(req.body.email, function(err, user) {
        if (err){
            res.send(err);
        } else {
            if(user.length){
                if(user[0].status === 1){
                    // res.json({id:user[0].id,name:user[0].name, email:user[0].email, message:"Login Success"});
                    if(password === user[0].password){
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
                        res.status(400).send({message:"Wrong Password"});
                    }
                } else {
                    res.status(400).send({message:"Please Activate Your Account"});
                }
            } else {
                res.status(400).send({message:"No user found with this email : "+req.body.email});
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