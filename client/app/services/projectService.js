'use strict';

angular.module('app')
  .factory('projectService', function ($http) {
    return {
      getProjects: function () {
        return $http.get('api/projects');
      },
      putTimesheet: function (project) {
        return $http.put('api/projects/' + project._id, project);
      },
      postTimesheet: function (project) {
        return $http.post('api/projects', project);
      },
      deleteTimesheet: function (id) {
        return $http.delete('api/projects/' + id);
      }
    };
  });