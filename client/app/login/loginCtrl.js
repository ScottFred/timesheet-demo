'use strict';

angular.module('app')
  .controller('loginCtrl', function ($scope, $location, authService) {
    $scope.credentials = {};
    $scope.login = function () {
      authService.login($scope.credentials)
        .success(function () {
          $location.path('/');
        })
        .error(function (error, status) {
          console.error('login failed', error);
          $scope.errorMessage = status === 401 ? 'Invalid username or password' : error;
        });
    };
  });
