const jwt       = require('jsonwebtoken');
const crypto    = require('crypto');

const SALT_LENGTH = 16;

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if(!bearerHeader){
        res.status(403);
        res.send("Not authorized");
    }

    const token = bearerHeader.split(' ')[1];
    
    jwt.verify(token, 'mysecret', (err, data) => {
        if(err){
            res.status(403);
            res.send("Not authorized");
        }
        else{
            console.log("Data", data);
            if(data.user && data.user.id){
                res.locals.id = data.user.id;
                next();
            }
            else{
                res.status(403);
                res.send("Not authorized");
            }
        }
    });
}

exports.generateSalt = function(){
    return crypto.randomBytes(Math.ceil(SALT_LENGTH / 2))
            .toString('hex')
            .slice(0, SALT_LENGTH);
};

exports.saltHashPassword = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};