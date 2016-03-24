module.exports = (function() {
  "use strict";

  function getUser(req, res) {
    res.json({
      username: req.user.username
    });
  }

  return {
    getUser: getUser
  };
})();
