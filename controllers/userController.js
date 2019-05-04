const User = require("../models/user");
const moment = require('moment');
const bcrypt = require('bcryptjs')

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
