'use strict';

angular.module('app')
  .factory('authService', function ($http, $location, authTokenService) {
    var _claims;

    function getClaims() {
      _claims = _claims || jwt_decode(authTokenService.getToken());
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
        return $location.path('/login');
      }
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