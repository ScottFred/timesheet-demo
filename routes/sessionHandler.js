"use strict";

var passport = require('passport');
var account = require('../models/account');

module.exports.getRegister = function(req, res) {
    res.render('register');
};

module.exports.postRegister = function(req, res) {
    account.register(new account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);
            return res.render('register', { errors: [err.message] });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect(req.query.from || '/');
        });
    });
};

module.exports.getLogin = function(req, res) {
    if (req.query.failed) {
        res.render('login', { errors: ['Invalid Username or Password']});
    }
    else {
        res.render('login');
    }
};

module.exports.postLogin = function(req, res) {
    return passport.authenticate('local', { failureRedirect: '/auth/login?failed=1&from=' + req.query.from || '/' })(req, res, function () {
        res.redirect(req.query.from || '/');
    });
};

module.exports.getLogout = function(req, res) {
    req.logout();
    res.redirect('/');
};

module.exports.redirectToLogin = function(req, res) {
    res.redirect('/auth/login?from=' + req.originalUrl);
}