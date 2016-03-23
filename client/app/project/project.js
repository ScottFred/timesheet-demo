"use strict";

angular
  .module('projectModule', [
    'toasty'
  ])
  .controller('projectCtrl', function($scope, $http, toasty) {
    $scope.editingProject = null;
    $scope.originalProject = null;

    function beginEdit(project) {
      $scope.editingProject = project;
      $scope.originalProject = JSON.parse(JSON.stringify(project));
    }

    function endEdit() {
      $scope.editingProject = null;
      $scope.originalProject = null;
    }

    function displayError(title, data) {
      toasty.pop.error({
        title: title,
        msg: data,
        showClose: true,
        clickToClose: true,
        timeout: 0
      });
      console.log(title + ': ' + data);
    }

    function displayWarning(title, data) {
      toasty.pop.warning({
        title: title,
        msg: data,
        showClose: true,
        clickToClose: true,
        timeout: 5000
      });
      console.log(title + ': ' + data);
    }

    function validateRequiredName(project) {
      if (!project.name || project.name === '' || project.name.trim() === '') {
        displayWarning('Project name is required');
        return false;
      }
      return true;
    }

    $http.get('api/projects')
      .success(function(data) {
        data.forEach(function(d) {
          d.sortableName = d.name;
        });
        $scope.projects = data;
      })
      .error(function(data, status) {
        $scope.projects = [];
        displayError('Error Loading Projects', data);
      });

    $scope.edit = beginEdit;

    $scope.save = function () {
      console.log('Saving');
      var project = $scope.editingProject;
      if (!validateRequiredName(project)) return;
      project.isSaving = true;
      if (project._id) {
        $http.put('api/projects/' + project._id, project)
          .success(function(data) {
            project.sortableName = data.name;
            project.name = data.name;
            project.isSaving = false;
          })
          .error(function(data, status) {
            displayError('Error Saving Project', data);
            project.isSaving = false;
          });
      }
      else {
        $http.post('api/projects', project)
          .success(function(data) {
            project._id = data._id;
            project.sortableName = data.name;
            project.name = data.name;
            project.isSaving = false;
          })
          .error(function(data, status) {
            displayError('Error Saving Project', data);
            project.isSaving = false;
          });
      }
      endEdit();
    };

    $scope.cancel = function() {
      if (!$scope.editingProject) return;
      var index = $scope.projects.indexOf($scope.editingProject);
      if ($scope.editingProject._id) {
        // Cancelled editing existing project... Restore the original project
        $scope.projects[index] = $scope.originalProject;
      }
      else {
        // Cancelled adding new project... Remove the new project
        $scope.projects.splice(index, 1);
      }
      endEdit();
    };

    $scope.delete = function() {
      var project = $scope.editingProject;
      project.isSaving = true;
      var index = $scope.projects.indexOf(project);
      if (project._id) {
        $http.delete('api/projects/' + project._id)
          .success(function(data) {
            project.isSaving = false;
            $scope.projects.splice(index, 1);
          })
          .error(function(data, status) {
            displayError('Error Deleting Project', data);
            project.isSaving = false;
          });
      }
      endEdit();
    };

    $scope.add = function() {
      var project = {};
      $scope.projects.push(project);
      beginEdit(project);
    };

    $scope.canAdd = function() {
      return !$scope.isEditing()
        && !$scope.isLoading();
    };

    $scope.isEditing = function (project) {
      if (project) {
        return project === $scope.editingProject;
      }
      else {
        return $scope.editingProject !== null;
      }
    };

    $scope.isLoading = function() {
      return !$scope.projects
        || !$scope.projects;
    };

    $scope.isSaving = function() {
      return $scope.projects
        && $scope.projects.some(function(project) { return project.isSaving; });
    };
  });
