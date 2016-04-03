'use strict';

angular.module('app')
  .factory('authTokenService', function ($window) {
    function setToken(token) {
      if (token) {
        $window.sessionStorage.authToken = token;
      }
      else {
        delete $window.sessionStorage.authToken;
      }
    }

    function clearToken() {
      setToken();
    }

    function getToken() {
      return $window.sessionStorage.authToken;
    }

    return {
      setToken: setToken,
      clearToken: clearToken,
      getToken: getToken
    };
  });