const { check, validationResult }   = require('express-validator/check');
const { sanitizeBody }              = require('express-validator/filter');
const jwt                           = require('jsonwebtoken');

const models        = require('../models');
const authService   = require('../services/authService');

exports.login = (req, res, next) => {
    if(!req.body.userName || !req.body.password){
        res.status(400);
        res.send("Username and password are required");
    }
    else {
        models.User.findOne({
            where: {
                userName: req.body.userName
            }
        })
        .then(user => {
            if(!user || user.passwordHash !== authService.saltHashPassword(req.body.password, user.salt)){
                res.status(400);
                res.send("User data not correct");
            }
            else{
                const token = jwt.sign({ user: user }, 'mysecret');
                res.json({ message: "Hello from login with token", token: token });
            }
        })
        .catch(err => {
            return next(err);
        });
    }
};

exports.register = [(req, res, next) => {
    if(!req.body.userName || !req.body.password || !req.body.firstName || !req.body.lastName){
        res.status(400);
        res.json({ code: 2, message: "Username, password, first name and last name are required" });
    }
    else {
        models.User.findOne({
            where: {
                userName: req.body.userName
            }
        })
        .then(user => {
            if(user){
                res.status(400);
                res.json({ code: 2, message: "Username is already in use" });
            }
            else{
                const salt = authService.generateSalt();
                const passwordHash = authService.saltHashPassword(req.body.password, salt);
                
                models.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    passwordHash: passwordHash,
                    salt: salt
                })
                .then(user => {
                    const token = jwt.sign({ user: user }, 'mysecret');
                    res.json({ token: token });
                })
                .catch(err => {
                    res.status(500);
                    res.send({status: 1, error: err});
                });
            }
        })
        .catch(err => {
            return next(err);
        });
    }
}];