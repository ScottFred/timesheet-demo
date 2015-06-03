var express = require('express');
var security = require('./security');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect(req.query.from || '/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect(req.query.from || '/');
});

router.get('/logout', security.requireAuthentication, function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;