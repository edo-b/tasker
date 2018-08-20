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
    
}];