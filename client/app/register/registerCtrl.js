'use strict';

angular.module('app')
  .controller('registerCtrl', function ($scope, $location, authService, toastService) {
    $scope.register = function () {
      authService.register($scope.credentials)
        .success(function () {
          $location.path('/');
        })
        .error(function (data) {
          toastService.displayError(data.message || 'Register failed');
        });
    };
  });
