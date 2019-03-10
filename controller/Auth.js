const jwt = require('jsonwebtoken');
const config = require('./../config');
const ErrorMessage = require('./../errors.js');

exports.getToken = function (userId) {
    if (!userId) {
        throw Error('user id missing');
    }
    var authKey = jwt.sign({
        _id: userId,
        date: new Date()
    }, config.jwt_secret, {
        expiresIn: "7d"
    });
    return authKey;
}

exports.authenticate = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-token'];
    if(!token) {
        return res.status(400).send(ErrorMessage.TOKEN_MISSING);
    }
    jwt.verify(token, config.jwt_secret, function (err, decoded) {
        if (err) {
            return res.status(400).send(ErrorMessage.TOKEN_INVALID);
        } else {
            req.auth_user = decoded;
            next();
        }
    });
}