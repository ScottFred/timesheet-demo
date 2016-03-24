angular
  .module('timesheetApp')
  .factory('authService', function($http) {
    var _currentUser;

    $http.get('api/auth/user')
      .success(function(data) {
        _currentUser = data;
      })
      .error(function() {
        _currentUser = null;
      });

    return {
      currentUser: function() { return _currentUser; }
    };
});