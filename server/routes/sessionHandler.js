module.exports = (function() {
    "use strict";

    var passport = require('passport');
    var account = require('../models/account');

    function getRegister(req, res) {
        res.render('register', { from: req.query.from });
    }

    function postRegister(req, res) {
        account.register(new account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                return res.render('register', { errors: [err.message] });
            }
            passport.authenticate('local')(req, res, function() {
                res.redirect(req.query.from || '/');
            });
        });
    }

    function getLogin(req, res) {
        if (req.query.failed) {
            res.render('login', { from: req.query.from, errors: ['Invalid Username or Password']});
        }
        else {
            res.render('login', { from: req.query.from });
        }
    }

    function postLogin(req, res) {
        return passport.authenticate('local', {
            failureRedirect: '/auth/login?failed=1&from=' + req.query.from || '/'
        })(req, res, function() {
            res.redirect(req.query.from || '/');
        });
    }

    function getLogout(req, res) {
        req.logout();
        res.redirect('/');
    }

    function redirectToLogin(req, res) {
        res.redirect('/auth/login?from=' + req.originalUrl);
    }

    return {
        getRegister: getRegister,
        postRegister: postRegister,
        getLogin: getLogin,
        postLogin: postLogin,
        getLogout: getLogout,
        redirectToLogin: redirectToLogin
    };
})();
