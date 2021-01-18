
var express = require("express");
var bcrypt = require("bcrypt-inzi");
var jwt = require('jsonwebtoken');
var postmark = require("postmark");

var { SERVER_SECRET } = new postmark.Client("");

var { userModel, otpModel, tweetModel } = require("../dbrepo/models");
console.log("userModel:", userModel);


var api = express.Router();

api.post("signup", (req, res, next)=>{

    if(!req.body.name
        || !req.body.password
        || !req.body.phone
        || !req.body.gender){

            res.status(403).send(`
            please send name, email, password, phone and gender in json body.
            e.g:
            {
                "name":"sultan",
                "email":"sultan@gmail.com",
                "password":"123",
                "phone":"03316071323",
                "gender":"male",
            }`)
            return
        }

        userModel.findOne({ email: req.body.email},
            function (err,doc){
                if (!err && !doc){

                    bcrypt.stringToHash(req.body.password).then(function(hash){

                        var newUser = new userModel({
                            "name":req.body.name,
                            "email":req.body.email,
                            "password":hash,
                            "phone":req.body.phone,
                            "gender":req.body.gender,
                        })
                        newUser.save((err, data) =>{

                            if (!err){
                                res.send ({
                                    status:200,
                                    message:"user created"
                                })
                            }else {
                                console.log(err);
                                res.status(500).send({
                                    message: "user create error" + err
                                })
                            }
                        })
                    })
                }else if (err) {
                    res.status(500).send({
                        message:"db error"
                    })
                }else {
                    res.send({
                        message: "user already exist"
                    })
                }
            })
});

