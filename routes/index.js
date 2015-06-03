var express = require('express');
var router = express.Router();
var security = require('./security');

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('timesheets', { user : req.user });
    }
    else {
        res.render('index', { user : req.user });
    }
});

router.get('/projects', security.requireAuthentication, function (req, res) {
    res.render('projects', { user : req.user });
});

router.get('/about', function (req, res) {
    res.render('about', { user : req.user });
});

router.get('/contact', function (req, res) {
    res.render('contact', { user : req.user });
});

module.exports = router;