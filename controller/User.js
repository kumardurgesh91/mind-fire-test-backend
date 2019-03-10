let UserModel = require('./../model/User');
let ErrorMessage = require('./../errors.js');
let Auth = require('./Auth');

exports.get = async function(req, res, next) {
    const id = req.auth_user._id;
    
    try {
        let user = await UserModel.findOne({_id:id});
        user = user.toJSON();
        delete user.salt;
        delete user.hash;
        const token = Auth.getToken(user._id);
        return res.status(200).send({token, user});
    } catch(e) {
        throw new Error(e);
    }
}

exports.register = async function (req, res, next) {


    let {user_name, name, password, email} = req.body;

    if (!name) {
        return res.status(400).send(ErrorMessage.NAME_EMPTY);
    }
    if (!user_name) {
        return res.status(400).send(ErrorMessage.USER_NAME_EMPTY);
    }
    if (!email) {
        return res.status(400).send(ErrorMessage.EMAIL_EMPTY);
    }
    if (!password) {
        return res.status(400).send(ErrorMessage.PASSWORD_EMPTY);
    }

    if (user_name.length < 3 || user_name.length > 32) {
        return res.status(400).send(ErrorMessage.USER_NAME_INVALID);
    }

    if (password.length < 3 || password.length > 32) {
        return res.status(400).send(ErrorMessage.PASSWORD_INVALID);
    }

    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
        return res.status(400).send(ErrorMessage.EMAIL_INVALID);
    }

    let userModel = new UserModel();
    userModel.email = email;
    userModel.name = name;
    userModel.setPassword(password);
    userModel.user_name = user_name;

    try {
        let userNameCount = await UserModel.count({user_name: user_name});
        if(userNameCount > 0) {
            return res.status(400).send(ErrorMessage.USER_NAME_DUPLICATE);
        }
        let emailCOunt = await UserModel.count({email: email});
        if(emailCOunt > 0) {
            return res.status(400).send(ErrorMessage.EMAIL_DUPLICATE);
        }
        let user = await userModel.save();
        user = user.toJSON();
        delete user.salt;
        delete user.hash;
        return res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
}

exports.login = async function (req, res, next) {
    let {user_name, password} = req.body;
    
    if (!user_name) {
        return res.status(400).send(ErrorMessage.USER_NAME_EMPTY);
    }
    if (!password) {
        return res.status(400).send(ErrorMessage.PASSWORD_EMPTY);
    }
    
    try {
        let user = await UserModel.findOne({user_name: user_name, is_deleted: false});
        if(!user || !user.validPassword(password)) {
            return res.status(400).send(ErrorMessage.INVALID_USER_NAME_OR_PASSWORD);
        }
        user = user.toJSON();
        delete user.salt;
        delete user.hash;
        const token = Auth.getToken(user._id);
        return res.status(200).send({token, user});
    } catch(err) {
        return next(err);
    }
}