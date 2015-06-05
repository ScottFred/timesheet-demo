"use strict";

module.exports.requireAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login?from=' + req.originalUrl);
};
