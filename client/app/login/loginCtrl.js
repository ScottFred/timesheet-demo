'use strict';

angular.module('app')
  .controller('loginCtrl', function ($scope, $location, authService, toastService) {
    $scope.login = function () {
      authService.login($scope.credentials)
        .success(function () {
          console.info('login successful');
          $location.path('/');
        })
        .error(function () {
          console.error('login failed');
          toastService.displayError('Login failed');
        });
    };
  });
