'use strict';

angular.module('app')
  .factory('authService', function ($http, $location, authTokenService) {
    var _claims;

    function getClaims() {
      var token = authTokenService.getToken();
      if (!token) {
        return {};
      }
      _claims = _claims || jwt_decode(token);
      return _claims;
    }

    function clearClaims() {
      _claims = null;
    }

    function isAuthenticated() {
      return !!authTokenService.getToken();
    }

    function requireAuthentication() {
      if (!isAuthenticated()) {
        console.log('Authenticate is required, redirecting to login');
        $location.path('/login');
        return false;
      }
      return true;
    }

    function login(credentials) {
      return $http.post('/api/auth/login', credentials)
        .success(function (data) {
          authTokenService.setToken(data.token);
        })
        .error(function () {
          authTokenService.clearToken();
        });
    }

    function logout() {
      authTokenService.clearToken();
      clearClaims();
    }

    function register(credentials) {
      return $http.post('/api/auth/user', credentials)
        .success(function (data) {
          authTokenService.setToken(data.token);
        })
        .error(function () {
          authTokenService.clearToken();
        });
    }

    return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      requireAuthentication: requireAuthentication,
      getClaims: getClaims
    };
  });