'use strict';

angular.module('app')
  .controller('registerCtrl', function ($scope, $location, authService) {
    $scope.credentials = {};
    $scope.register = function () {
      authService.register($scope.credentials)
        .success(function () {
          $location.path('/');
        })
        .error(function (error) {
          console.error('register failed', error);
          $scope.errorMessage = error;
        });
    };
  });
