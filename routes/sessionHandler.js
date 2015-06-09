"use strict";

var passport = require('passport');
var account = require('../models/account');

module.exports.getRegister = function (req, res) {
    return res.render('register');
};

module.exports.postRegister = function (req, res) {
    account.register(new account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);
            return res.render('register', { errors: [err.message] });
        }
        passport.authenticate('local')(req, res, function () {
            return res.redirect(req.query.from || '/');
        });
    });
};

module.exports.getLogin = function (req, res) {
    return res.render('login');
};

module.exports.postLogin = function (req, res) {
    return passport.authenticate('local')(req, res, function () {
        return res.redirect(req.query.from || '/');
    });
};

module.exports.getLogout = function (req, res) {
    req.logout();
    return res.redirect('/');
};
