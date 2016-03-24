module.exports = (function() {
    "use strict";

    function getIndex(req, res) {
        if (req.isAuthenticated()) {
            res.render('app', {user: req.user});
        }
        else {
            res.render('index', {user: req.user});
        }
    }

    return {
        getIndex: getIndex
    }
})();
