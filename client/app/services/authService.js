angular
  .module('timesheetApp')
  .service('authService', function($http) {
    var _currentUser;

    this.currentUser = function() { return _currentUser; };

    $http.get('api/auth/user')
      .success(function(data) {
        _currentUser = data;
      })
      .error(function() {
        _currentUser = null;
      });
});