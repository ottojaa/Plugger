const express = require("express");
const User = require("../models/user.js");
const user = express.Router();
const passport = require('passport')

user.post("/authenticate", (req, res, next) => {
    User.authenticate().then(() => {
        (req, res, next);
    });
});

user.get('/logout', function (req, res) {
    User.destroySession(req);
});

user.get('/user', (req, res) => {
    res.send(req.user)
});

user.post("/register", (req, res) => {
    const password = req.body.password;
    const passwordAgain = req.body.passwordAgain;

    if (password == passwordAgain) {
        const newUser = new User(req.body);
        User.createUser(newUser, (err, user) => {
            if (err) {
                res.send({ error: 'Could not complete registration' })
            } else {
                res.send(user).end()
            }
        });
    } else {
        res.send({ error: 'Passwords did not match.' })
    }
});

module.exports = user;