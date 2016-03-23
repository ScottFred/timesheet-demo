"use strict";

module.exports.getMain = function(req, res) {
    if (req.isAuthenticated()) {
        res.render('app', {user: req.user});
    }
    else {
        res.render('index', {user: req.user});
    }
};
