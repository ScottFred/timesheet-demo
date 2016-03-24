"use strict";

angular
  .module('timesheetApp', [
    'ngRoute',
    'templates',
    'toasty'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/projects', {
        controller: 'projectCtrl',
        templateUrl: 'project/project.tpl.html'
      })
      .when('/', {
        controller: 'timesheetCtrl',
        templateUrl: 'timesheet/timesheet.tpl.html'
      });
  });
