const User = require("../models/user");
const moment = require('moment');
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback);
}

exports.getUserById = (id, callback) =>  {
    User.findById(id, callback);
}

exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
exports.destroySession = (req) => {
    req.session.destroy(function (err) {
        res.clearCookie('connect.sid');
        req.logout();
        res.send('Logged out succesfully')
    }).catch((err) => {
        res.send({error: err})
    });
}
exports.authenticate = (req) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            return res.send({ error: "Invalid login credentials" })
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.send(user)
        });
    })
}
