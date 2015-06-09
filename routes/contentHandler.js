"use strict";

module.exports.getMain = function(req, res) {
    if (req.isAuthenticated()) {
        return res.render('timesheets', {user: req.user});
    }
    else {
        return res.render('index', {user: req.user});
    }
};

module.exports.getProjects = function(req, res) {
    return res.render('projects', {user: req.user});
};

module.exports.getAbout = function(req, res) {
    return res.render('about', {user: req.user});
};

module.exports.getContact = function(req, res) {
    return res.render('contact', {user: req.user});
};
